'use server';

import nodemailer from 'nodemailer';
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

        // 2. Configure Transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: Number(process.env.EMAIL_PORT) === 465, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false
            },
        });

        // 3. Prepare Resume Buffer
        const arrayBuffer = await resume.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // 4. Send Internal Email (To Team)
        await transporter.sendMail({
            from: `"McPrime Careers" <${process.env.EMAIL_USER}>`,
            to: 'careers@mcprimedigital.com',
            replyTo: email,
            subject: `New Application: ${role} - ${fullName}`,
            text: `
        New Job Application Received

        Name: ${fullName}
        Email: ${email}
        Role: ${role}
        Portfolio: ${portfolio}

        Message:
        ${message}
      `,
            html: `
        <h2>New Job Application Received</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Portfolio:</strong> <a href="${portfolio}">${portfolio}</a></p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
            attachments: [
                {
                    filename: resume.name,
                    content: buffer,
                },
            ],
        });

        // 5. Send Confirmation Email (To Applicant)
        await transporter.sendMail({
            from: `"McPrime Digital" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Application Received - McPrime Digital',
            text: `
        Hi ${fullName},

        Thank you for applying to McPrime Digital for the ${role} position.

        We have received your application and will review your portfolio and details. If your profile matches our needs, we will be in touch shortly.

        Best regards,
        The McPrime Team
      `,
            html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Application Received</h2>
          <p>Hi ${fullName},</p>
          <p>Thank you for applying to <strong>McPrime Digital</strong> for the <strong>${role}</strong> position.</p>
          <p>We have received your application and will review your portfolio and details. If your profile matches our needs, we will be in touch shortly.</p>
          <br>
          <p>Best regards,</p>
          <p><strong>The McPrime Team</strong></p>
        </div>
      `,
        });

        return { success: true, message: 'Application submitted successfully.' };

    } catch (error) {
        console.error('Email Error:', error);
        return { success: false, message: 'Failed to submit application. Please try again later.' };
    }
}
