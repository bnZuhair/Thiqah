import { streamObject } from "ai";
import { NextRequest } from "next/server";
import { gemini } from "@/lib/ai/provider";
import {
  ExtractRequestSchema,
  getExtractionSchema,
} from "@/lib/ai/schemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = ExtractRequestSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { error: "Invalid request", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { prompt, data, schema } = parsed.data;
  const extractionSchema = getExtractionSchema(schema);

  const result = streamObject({
    model: gemini,
    schema: extractionSchema,
    messages: [
      { role: "user" as const, content: data },
    ],
    system: prompt,
  });

  return result.toTextStreamResponse();
}
