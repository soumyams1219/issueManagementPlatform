import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from '../db/drizzle';
import { issues, discussions } from '../db/schema';
import { eq } from 'drizzle-orm';
import "dotenv/config";

@Injectable()
export class AiService {
  
  private genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  async analyze(prompt: string) {
  try {
    console.log("GEMINI REQUEST START");
    console.log("GEMINI KEY:", process.env.GEMINI_API_KEY);
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing in .env");
    }

    const model = this.genAI.getGenerativeModel({
  model: "gemini-1.5-flash-002",
});

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    console.log("GEMINI SUCCESS");

    return text;

  } catch (error) {
    console.error("GEMINI ERROR:", error);
    throw error;
  }
}

  // MAIN FUNCTION (IMPORTANT)
async analyzeIssue(id: string) {
  try {
    const issue = await db
      .select()
      .from(issues)
      .where(eq(issues.id, id))
      .then(res => res[0]);

    if (!issue) {
      throw new Error("Issue not found");
    }

    const discussion = await db
      .select()
      .from(discussions)
      .where(eq(discussions.issueId, id));

    const context = `
Issue:
Title: ${issue.title}
Description: ${issue.description}
Status: ${issue.status}
Priority: ${issue.priority}

Discussions:
${discussion?.map(d => `- ${d.message}`).join("\n") || "No discussions"}
`;

    const prompt = `
You are an AI issue analyzer.

Analyze:
1. Root Cause
2. Risk Level
3. Solutions
4. Recommendations

Context:
${context}
`;

    const analysis = await this.analyze(prompt);

    if (!analysis) {
      throw new Error("Gemini returned empty response");
    }

    await db
      .update(issues)
      .set({
        analysis,
        updatedAt: new Date(),
      })
      .where(eq(issues.id, id));

    return { analysis };

  } catch (error) {
    console.error("ANALYSIS ERROR:", error);
    throw error;
  }
}
}