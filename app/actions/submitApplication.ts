'use server';


import { headers } from 'next/headers';
import rateLimit from '@/lib/rateLimit';

// Initialize rate limiter: 3 requests per minute per IP
const limiter = rateLimit({
    interval: 60000, // 1 minute
    uniqueTokenPerInterval: 500,
});

export async function submitApplication(formData: FormData) {
    try {
        // 0. Security: Rate Limiting
        try {
            // Get IP or use fallback
            const headersList = await headers();
            const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown-ip';

            // Limit to 3 applications per minute per IP
            await limiter.check(3, ip);
        } catch {
            return { success: false, message: 'Too many submissions. Please wait a minute before trying again.' };
        }

        const fullName = formData.get('fullName') as string;
        const email = formData.get('email') as string;
        const role = formData.get('role') as string;
        const portfolio = formData.get('portfolio') as string;
        const message = formData.get('message') as string;
        const resume = formData.get('resume') as File;

        // 1. Basic Validation
        if (!fullName || !email || !role || !resume) {
            return { success: false, message: 'Missing required fields.' };
        }

        // 2. Strict Security Validation (File Uploads)
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        if (!allowedTypes.includes(resume.type)) {
            console.warn(`[SECURITY] Blocked invalid upload type: ${resume.type} from ${email}`);
            return { success: false, message: 'Invalid file type. Only PDF and DOC/DOCX are allowed.' };
        }

        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
        if (resume.size > MAX_FILE_SIZE) {
            console.warn(`[SECURITY] Blocked oversized upload: ${resume.size} bytes from ${email}`);
            return { success: false, message: 'File is too large. Maximum size is 5MB.' };
        }

        const MAILGUN_KEY = process.env.MAILGUN_KEY;
        const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
        const CONTACT_EMAIL = process.env.CONTACT_EMAIL_DESTINATION;

        if (!MAILGUN_KEY || !MAILGUN_DOMAIN || !CONTACT_EMAIL) {
            console.error('Mailgun credentials missing');
            return { success: false, message: 'Server email configuration error.' };
        }

        const url = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;
        const auth = Buffer.from(`api:${MAILGUN_KEY}`).toString('base64');

        // 3. Send Internal Email (To Team) via Mailgun
        const adminFormData = new FormData();
        adminFormData.append('from', `McPrime Careers <postmaster@${MAILGUN_DOMAIN}>`);
        adminFormData.append('to', CONTACT_EMAIL);
        adminFormData.append('h:Reply-To', email);
        adminFormData.append('subject', `New Application: ${role} - ${fullName}`);
        adminFormData.append('text', `New Job Application Received\n\nName: ${fullName}\nEmail: ${email}\nRole: ${role}\nPortfolio: ${portfolio}\n\nMessage:\n${message}`);
        adminFormData.append('attachment', resume);

        const adminResponse = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${auth}`,
            },
            body: adminFormData as any,
        });

        if (!adminResponse.ok) {
            console.error('Mailgun admin email failed:', await adminResponse.text());
            throw new Error('Failed to send internal application email');
        }

        // 4. Send Confirmation Email (To Applicant) via Mailgun
        const userFormData = new FormData();
        userFormData.append('from', `McPrime Digital <postmaster@${MAILGUN_DOMAIN}>`);
        userFormData.append('to', email);
        userFormData.append('subject', 'Application Received - McPrime Digital');
        userFormData.append('text', `Hi ${fullName},\n\nThank you for applying to McPrime Digital for the ${role} position.\n\nWe have received your application and will review your portfolio and details. If your profile matches our needs, we will be in touch shortly.\n\nBest regards,\nThe McPrime Team`);

        const userResponse = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${auth}`,
            },
            body: userFormData as any,
        });

        if (!userResponse.ok) {
            console.error('Mailgun user email failed:', await userResponse.text());
            // We don't fail the whole user request if the confirmation email fails
        }

        return { success: true, message: 'Application submitted successfully.' };

    } catch (error) {
        console.error('Email Error:', error);
        return { success: false, message: 'Failed to submit application. Please try again later.' };
    }
}
