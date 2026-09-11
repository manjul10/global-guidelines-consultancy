"use server";

import { createInquiry } from "@/lib/modules/inquiries/service";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  destination: z.string().optional(),
  message: z.string().min(10, "Please provide a short description of your educational background or query"),
});

export async function submitInquiryAction(formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || undefined,
      destination: (formData.get("destination") as string) || undefined,
      message: formData.get("message") as string,
    };

    const validated = inquirySchema.parse(rawData);

    const inquiry = await createInquiry({
      name: validated.name,
      email: validated.email,
      phone: validated.phone,
      serviceOfInterest: validated.destination,
      message: validated.message,
    });

    return { success: true, id: inquiry.id };
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0]?.message || "Invalid input" };
    }
    const msg = error instanceof Error ? error.message : "Failed to submit inquiry";
    return { success: false, error: msg };
  }
}
