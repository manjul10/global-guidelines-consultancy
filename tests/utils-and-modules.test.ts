import { describe, it, expect } from "vitest";
import { slugify, formatDate } from "@/lib/utils";
import { z } from "zod";

describe("Utility functions", () => {
  it("slugifies titles into lowercase clean URLs", () => {
    expect(slugify("Australia Student Visa 2026: Genuine Student")).toBe(
      "australia-student-visa-2026-genuine-student"
    );
    expect(slugify("  Study in USA & F-1 Visa Guide!  ")).toBe(
      "study-in-usa-f-1-visa-guide"
    );
  });

  it("formats dates gracefully", () => {
    const formatted = formatDate(new Date("2026-09-11T12:00:00Z"));
    expect(formatted).toContain("2026");
    expect(formatDate(null)).toBe("");
  });
});

describe("Inquiry validation schema", () => {
  const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10),
  });

  it("validates legitimate student submissions", () => {
    const res = schema.safeParse({
      name: "Suman Giri",
      email: "suman@example.com",
      message: "Interested in Master of IT in Sydney for July intake.",
    });
    expect(res.success).toBe(true);
  });

  it("rejects invalid email and too short message", () => {
    const res = schema.safeParse({
      name: "S",
      email: "not-an-email",
      message: "hi",
    });
    expect(res.success).toBe(false);
  });
});
