import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const { ref, controls } = useScrollAnimation();
  const { toast } = useToast();
  
  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact me directly.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: ContactForm) => {
    contactMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: "fas fa-envelope",
      title: "Email",
      value: "tharunvankayala@gmail.com",
      href: "mailto:tharunvankayala@gmail.com"
    },
    {
      icon: "fas fa-phone",
      title: "Phone",
      value: "+91 6309558944",
      href: "tel:+916309558944"
    },
    {
      icon: "fas fa-map-marker-alt",
      title: "Location",
      value: "Hyderabad, India",
      href: null
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-dark-bg to-dark-card">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.h2 
          className="font-orbitron text-4xl font-bold text-center mb-16 text-tron"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ duration: 0.8 }}
        >
          Get In Touch
        </motion.h2>
        
        <div className="max-w-2xl mx-auto">
          <motion.div 
            className="glass-card p-8 rounded-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input 
                    {...form.register("name")}
                    type="text" 
                    className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg focus:border-tron focus:outline-none text-white placeholder-gray-400 transition-colors duration-300" 
                    placeholder="Your Name"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input 
                    {...form.register("email")}
                    type="email" 
                    className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg focus:border-tron focus:outline-none text-white placeholder-gray-400 transition-colors duration-300" 
                    placeholder="your.email@example.com"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                <input 
                  {...form.register("subject")}
                  type="text" 
                  className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg focus:border-tron focus:outline-none text-white placeholder-gray-400 transition-colors duration-300" 
                  placeholder="Project Discussion"
                />
                {form.formState.errors.subject && (
                  <p className="text-red-400 text-sm mt-1">{form.formState.errors.subject.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea 
                  {...form.register("message")}
                  rows={6} 
                  className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg focus:border-tron focus:outline-none text-white placeholder-gray-400 transition-colors duration-300 resize-none" 
                  placeholder="Tell me about your project..."
                />
                {form.formState.errors.message && (
                  <p className="text-red-400 text-sm mt-1">{form.formState.errors.message.message}</p>
                )}
              </div>
              <motion.button 
                type="submit" 
                disabled={contactMutation.isPending}
                className="w-full neon-border px-8 py-4 bg-transparent text-tron font-semibold rounded-lg hover:bg-tron hover:text-black transition-all duration-300 disabled:opacity-50"
                whileHover={{ scale: contactMutation.isPending ? 1 : 1.02 }}
                whileTap={{ scale: contactMutation.isPending ? 1 : 0.98 }}
              >
                {contactMutation.isPending ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-2"></i>
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="mt-12 grid md:grid-cols-3 gap-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {contactInfo.map((info, index) => (
              <motion.div 
                key={info.title}
                className="glass-card p-6 rounded-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={controls}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.i 
                  className={`${info.icon} text-tron text-2xl mb-4`}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                ></motion.i>
                <h4 className="font-semibold text-white mb-2">{info.title}</h4>
                {info.href ? (
                  <a 
                    href={info.href} 
                    className="text-gray-400 text-sm hover:text-tron transition-colors"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-gray-400 text-sm">{info.value}</p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
