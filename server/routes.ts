import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import { sendContactEmail } from './email.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10)
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactSchema.parse(req.body);
      
      // Send email if email service is configured
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const emailSent = await sendContactEmail({
          name: validatedData.name,
          email: validatedData.email,
          message: `Subject: ${validatedData.subject}\n\n${validatedData.message}`
        });
        
        if (emailSent) {
          res.json({ 
            success: true, 
            message: "Message sent successfully" 
          });
        } else {
          res.status(500).json({ 
            success: false, 
            message: "Failed to send message. Please try again." 
          });
        }
      } else {
        // Fallback: log the message for manual processing
        console.log("Contact form submission:", validatedData);
        res.json({ 
          success: true, 
          message: "Message received. I'll get back to you soon!" 
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation failed", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Resume download endpoint
  app.get("/api/download-resume", (req, res) => {
    try {
      const resumePath = path.resolve(process.cwd(), "attached_assets", "THARUN_VANKAYALA_RESUME_1749451325800.pdf");
      
      // Check if file exists
      if (!fs.existsSync(resumePath)) {
        return res.status(404).json({
          success: false,
          message: "Resume file not found."
        });
      }

      // Set headers for file download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="Tharun_Vankayala_Resume.pdf"');
      
      // Stream the file
      const fileStream = fs.createReadStream(resumePath);
      fileStream.pipe(res);
      
    } catch (error) {
      console.error("Error serving resume:", error);
      res.status(500).json({
        success: false,
        message: "Error downloading resume."
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
