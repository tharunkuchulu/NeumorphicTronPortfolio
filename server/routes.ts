import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

// Email configuration
const createEmailTransporter = () => {
  // For development, use Ethereal Email (fake SMTP service)
  // In production, use a real email service like Gmail, SendGrid, etc.
  if (process.env.NODE_ENV === 'production') {
    return nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  } else {
    // For development - just log emails to console
    return nodemailer.createTransporter({
      streamTransport: true,
      newline: 'unix',
      buffer: true
    });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint with email functionality
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactSchema.parse(req.body);
      const { name, email, subject, message } = validatedData;
      
      // Create email transporter
      const transporter = createEmailTransporter();
      
      // Email content
      const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.CONTACT_EMAIL || 'tharunvankayala@gmail.com',
        subject: `Portfolio Contact: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #00ffff; border-bottom: 2px solid #00ffff; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
            </div>
            <div style="background: #fff; padding: 20px; border-left: 4px solid #00ffff; margin: 20px 0;">
              <h3>Message:</h3>
              <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            <hr style="border: 1px solid #eee; margin: 30px 0;">
            <p style="color: #666; font-size: 12px;">
              This email was sent from the portfolio contact form at ${new Date().toISOString()}
            </p>
          </div>
        `,
        text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Sent at: ${new Date().toISOString()}
        `
      };
      
      // Send email
      if (process.env.NODE_ENV === 'production') {
        await transporter.sendMail(mailOptions);
      } else {
        // In development, log the email content
        console.log("📧 Email would be sent:", {
          from: mailOptions.from,
          to: mailOptions.to,
          subject: mailOptions.subject,
          message: validatedData
        });
      }
      
      // Log contact form submission for analytics
      console.log(`📝 Contact form submission from ${name} (${email}): ${subject}`);
      
      res.json({ 
        success: true, 
        message: "Message sent successfully! I'll get back to you soon." 
      });
    } catch (error) {
      console.error("Contact form error:", error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation failed", 
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to send message. Please try again or contact me directly." 
        });
      }
    }
  });

  // Resume download endpoint with better error handling
  app.get("/api/download-resume", (req, res) => {
    try {
      // Try multiple possible resume paths
      const possiblePaths = [
        path.resolve(process.cwd(), "attached_assets", "THARUN_VANKAYALA_RESUME_1749451325800.pdf"),
        path.resolve(process.cwd(), "assets", "resume.pdf"),
        path.resolve(process.cwd(), "public", "resume.pdf"),
        path.resolve(process.cwd(), "resume.pdf")
      ];
      
      let resumePath: string | null = null;
      for (const pathToCheck of possiblePaths) {
        if (fs.existsSync(pathToCheck)) {
          resumePath = pathToCheck;
          break;
        }
      }
      
      if (!resumePath) {
        console.warn("Resume file not found in any of the expected locations:", possiblePaths);
        return res.status(404).json({
          success: false,
          message: "Resume file not found. Please contact me directly for my resume."
        });
      }

      // Get file stats
      const stats = fs.statSync(resumePath);
      
      // Set headers for file download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="Tharun_Vankayala_Resume.pdf"');
      res.setHeader('Content-Length', stats.size.toString());
      res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
      
      // Stream the file
      const fileStream = fs.createReadStream(resumePath);
      
      fileStream.on('error', (streamError) => {
        console.error("File stream error:", streamError);
        if (!res.headersSent) {
          res.status(500).json({
            success: false,
            message: "Error streaming resume file."
          });
        }
      });
      
      fileStream.pipe(res);
      
      // Log download for analytics
      console.log(`📄 Resume downloaded from IP: ${req.ip || 'unknown'}`);
      
    } catch (error) {
      console.error("Error serving resume:", error);
      res.status(500).json({
        success: false,
        message: "Error downloading resume. Please try again later."
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
