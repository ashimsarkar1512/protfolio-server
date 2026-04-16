import { z } from "zod";

const createMessageValidation = z.object({
  messageTitle: z
    .string()
    .trim()
    .min(3, "Message title must be at least 3 characters long")
    .max(120, "Message title cannot exceed 120 characters"),
  messageBody: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters long")
    .max(3000, "Message cannot exceed 3000 characters"),
  senderName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .max(80, "Name cannot exceed 80 characters"),
  senderEmail: z
    .string()
    .trim()
    .email("Please provide a valid email address"),
});

export const messageValidation = {
  createMessageValidation,
};
