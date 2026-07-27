import { z } from "zod";

export const ExtractRequestSchema = z.object({
  message: z
    .string()
    .min(1)
    .describe("The user's question or input about the establishment's compliance"),
});

export const ComplianceAnalysisSchema = z.object({
  analysis: z.string().describe("The detailed compliance analysis text"),
  complianceStatus: z
    .enum(["compliant", "non-compliant", "partial"])
    .describe("Overall compliance status"),
  violations: z
    .array(z.string())
    .describe("List of current violations or gaps found"),
  recommendations: z
    .array(z.string())
    .describe("List of corrective actions to achieve compliance"),
});

export type ExtractRequest = z.infer<typeof ExtractRequestSchema>;
export type ComplianceAnalysis = z.infer<typeof ComplianceAnalysisSchema>;
