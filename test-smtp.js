require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

async function testSMTP() {
    console.log('Testing SMTP Connection (Zoho Specific)...');

    // Use user-provided host
    const HOST = process.env.EMAIL_HOST;
    const PORT = Number(process.env.EMAIL_PORT);
    const USER = process.env.EMAIL_USER;
    const PASS = process.env.EMAIL_PASS;

    console.log(`Host: ${HOST}`);
    console.log(`Port: ${PORT}`);
    console.log(`User: ${USER}`);
    console.log(`Pass Length: ${PASS ? PASS.length : 0}`);

    const transporter = nodemailer.createTransport({
        host: HOST,
        port: PORT,
        secure: PORT === 465,
        auth: {
            user: USER,
            pass: PASS,
        },
        tls: {
            rejectUnauthorized: false
        },
        debug: true,
        logger: true
    });

    try {
        await transporter.verify();
        console.log('✅ SMTP Connection Successful!');
    } catch (error) {
        console.error('❌ SMTP Connection Failed:', error);
    }
}

testSMTP();
