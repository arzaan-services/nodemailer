const nodeMailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

exports.sendMail = async (email,code) => {
    try {
        const transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });

        const emailTemplatePath = path.join(__dirname, 'email.html');
        const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');

        const emailContent = emailTemplate.replace('{{verificationCode}}', code);

        const info = await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: 'Email Verification',
            html: emailContent,
        });

        console.log(`Email sent successfully to ${email}`);
    } catch (err) {
        console.error('Error sending email:', err);
        throw new Error(err);
    }
}