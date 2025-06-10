import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import OpenAI from "openai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10)
});

const greetingSchema = z.object({
  timeOfDay: z.number().min(0).max(23),
  userAgent: z.string().optional(),
  timestamp: z.string()
});

// DeepSeek API configuration
const deepseek = new OpenAI({ 
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com'
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactSchema.parse(req.body);
      
      // In a real application, you would send an email here
      // For now, we'll just log the contact form data
      console.log("Contact form submission:", validatedData);
      
      // You could integrate with services like:
      // - Nodemailer for email sending
      // - SendGrid API
      // - AWS SES
      // - Or store in a database
      
      res.json({ 
        success: true, 
        message: "Contact form submitted successfully" 
      });
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

  // AI Greeting generation endpoint
  app.post("/api/greeting", async (req, res) => {
    try {
      const validatedData = greetingSchema.parse(req.body);
      const { timeOfDay, userAgent, timestamp } = validatedData;

      // Determine context based on time of day
      const getTimeContext = (hour: number) => {
        if (hour >= 5 && hour < 12) return "morning";
        if (hour >= 12 && hour < 17) return "afternoon";
        if (hour >= 17 && hour < 21) return "evening";
        return "night";
      };

      const timeContext = getTimeContext(timeOfDay);
      const currentDate = new Date(timestamp);
      const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'long' });

      // Generate AI greeting using DeepSeek
      const response = await deepseek.chat.completions.create({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: `You are ARIA (Advanced Research Intelligence Assistant), a futuristic AI interface for Tharun Vankayala's portfolio. Generate personalized, contextual greetings that feel cutting-edge and technological. Keep responses under 100 characters. Use futuristic terminology and convey innovation. Respond in JSON format with a "greeting" field.`
          },
          {
            role: "user", 
            content: `Generate a futuristic greeting for a visitor viewing Tharun's portfolio. Context: ${timeContext} on ${dayOfWeek}. Make it sound like an advanced AI welcoming them to explore innovative technology solutions.`
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 150,
        temperature: 0.8
      });

      const aiResponse = JSON.parse(response.choices[0].message.content || '{"greeting": "Welcome to the neural network"}');
      
      res.json({
        greeting: aiResponse.greeting,
        context: timeContext,
        timestamp: timestamp,
        success: true
      });

    } catch (error) {
      console.error("AI Greeting Error:", error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid request data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to generate greeting",
          greeting: "Welcome to the neural interface",
          context: "fallback",
          timestamp: new Date().toISOString()
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
