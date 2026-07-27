import { z } from "zod";

export const ExtractRequestSchema = z.object({
  prompt: z.string().describe("The instruction for data extraction"),
  data: z.string().describe("The raw text to extract data from"),
  schema: z
    .enum(["personal", "business", "custom"])
    .default("personal")
    .describe("The type of extraction schema to use"),
});

export const PersonalInfoSchema = z.object({
  name: z.string().describe("Full name"),
  email: z.string().describe("Email address"),
  phone: z.string().describe("Phone number"),
  address: z.string().describe("Physical address"),
  company: z.string().optional().describe("Company or organization"),
  title: z.string().optional().describe("Job title or position"),
});

export const BusinessInfoSchema = z.object({
  companyName: z.string().describe("Company name"),
  industry: z.string().describe("Industry sector"),
  address: z.string().describe("Business address"),
  phone: z.string().describe("Business phone number"),
  email: z.string().describe("Business email"),
  website: z.string().optional().describe("Company website"),
  employees: z.string().optional().describe("Number of employees"),
  founded: z.string().optional().describe("Year founded"),
});

export type ExtractRequest = z.infer<typeof ExtractRequestSchema>;
export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;
export type BusinessInfo = z.infer<typeof BusinessInfoSchema>;

export function getExtractionSchema(type: "personal" | "business" | "custom") {
  switch (type) {
    case "personal":
      return PersonalInfoSchema;
    case "business":
      return BusinessInfoSchema;
    case "custom":
      return z.record(z.string(), z.string());
  }
}
