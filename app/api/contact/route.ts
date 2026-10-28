import { NextResponse } from "next/server";
import rateLimit, { getClientIp } from "@/lib/rateLimit";

// 3 submissions per minute per address.
const limiter = rateLimit({ interval: 60_000, uniqueTokenPerInterval: 1000 });

const MAX = { name: 120, company: 120, email: 254, message: 5000, source: 80 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Single-line field: trims, strips CR/LF so nothing can inject mail headers, caps length. */
function line(value: unknown, max: number): string {
    return typeof value === "string" ? value.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";
}

export async function POST(req: Request) {
    try {
        const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
        if (!body) {
            return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
        }

        // Honeypot: real visitors never see or fill this field. Bots do; reply as if it worked.
        if (typeof body.website === "string" && body.website.trim() !== "") {
            return NextResponse.json({ success: true, message: "Email sent successfully" }, { status: 200 });
        }

        try {
            await limiter.check(3, getClientIp(req.headers));
        } catch {
            return NextResponse.json({ error: "Too many messages. Please wait a minute and try again." }, { status: 429 });
        }

        const name = line(body.name, MAX.name);
        const company = line(body.company, MAX.company);
        const email = line(body.email, MAX.email);
        const source = line(body.source, MAX.source) || "Website";
        const message = typeof body.message === "string" ? body.message.replace(/\r/g, "").trim().slice(0, MAX.message) : "";

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
        }
        if (!EMAIL_RE.test(email)) {
            return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
        }

        const MAILGUN_KEY = process.env.MAILGUN_KEY;
        const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
        const CONTACT_EMAIL_DESTINATION = process.env.CONTACT_EMAIL_DESTINATION;

        if (!MAILGUN_KEY || !MAILGUN_DOMAIN || !CONTACT_EMAIL_DESTINATION) {
            console.error("Mailgun credentials or destination email missing");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const formData = new URLSearchParams();
        formData.append("from", `McPrime Digital <postmaster@${MAILGUN_DOMAIN}>`);
        formData.append("to", CONTACT_EMAIL_DESTINATION);
        formData.append("h:Reply-To", email);
        formData.append("subject", `New Contact: ${name}${company ? ` (${company})` : ""} - ${source}`);
        formData.append("text", `
You have received a new contact form submission.

Details:
-------------------------
Name: ${name}
Company: ${company || "Not provided"}
Email: ${email}
Source: ${source}

Message:
-------------------------
${message}
-------------------------
    `);

        const url = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;
        const auth = Buffer.from(`api:${MAILGUN_KEY}`).toString("base64");

        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
        });

        if (!response.ok) {
            console.error("Mailgun error:", await response.text());
            return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
        }

        return NextResponse.json({ success: true, message: "Email sent successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error in /api/contact:", error);
        return NextResponse.json({ error: "Internal server error processing request" }, { status: 500 });
    }
}
