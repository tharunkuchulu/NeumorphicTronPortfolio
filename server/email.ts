import nodemailer from 'nodemailer';

interface EmailParams {
  name: string;
  email: string;
  message: string;
}

export async function sendContactEmail(params: EmailParams): Promise<boolean> {
  try {
    // Use environment variables for email configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or other email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // App password for Gmail
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${params.name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${params.name}</p>
        <p><strong>Email:</strong> ${params.email}</p>
        <p><strong>Message:</strong></p>
        <p>${params.message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: params.email
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email error:', error);
    return false;
  }
}