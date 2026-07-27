import { streamObject } from "ai";
import { NextRequest } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { gemini } from "@/lib/ai/provider";
import { ExtractRequestSchema, ComplianceAnalysisSchema } from "@/lib/ai/schemas";

function loadFile(filename: string): string {
  const filePath = join(process.cwd(), "prompts", filename);
  return readFileSync(filePath, "utf-8");
}

const systemPrompt = loadFile("system_prompt.md");
const context = loadFile("data/context.md");

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = ExtractRequestSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { error: "Invalid request", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { message } = parsed.data;

  const result = streamObject({
    model: gemini,
    schema: ComplianceAnalysisSchema,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: `المستند المرجعي الذي يجب الاعتماد عليه حصراً:\n\n${context}\n\n---\n\nالاستعلام: ${message}`,
      },
    ],
  });

  return result.toTextStreamResponse();
}
