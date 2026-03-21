import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { name, company, email, message, source } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
        }

        const MAILGUN_KEY = process.env.MAILGUN_KEY;
        const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;

        if (!MAILGUN_KEY || !MAILGUN_DOMAIN) {
            console.error('Mailgun credentials missing');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const formData = new URLSearchParams();
        formData.append('from', `McPrime Digital <postmaster@${MAILGUN_DOMAIN}>`);
        formData.append('to', 'mcprime2026@proton.me');
        formData.append('subject', `New Contact: ${name} ${company ? `(${company})` : ''} - ${source || 'Website'}`);
        formData.append('text', `
You have received a new contact form submission.

Details:
-------------------------
Name: ${name}
Company: ${company || 'Not provided'}
Email: ${email}
Source: ${source || 'Website'}

Message:
-------------------------
${message}
-------------------------
    `);

        // Mailgun API URL
        const url = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;

        // Create base64 encoded auth string
        const auth = Buffer.from(`api:${MAILGUN_KEY}`).toString('base64');

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString(),
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Mailgun error API Data:', errorData);
            return NextResponse.json({ error: 'Failed to send email via Mailgun' }, { status: response.status });
        }

        return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error in /api/contact:', error);
        return NextResponse.json({ error: 'Internal server error processing request' }, { status: 500 });
    }
}
