import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGateway } from "./ai-gateway.server";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const ChatSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(20),
});

const SYSTEM_PROMPT = `You are the friendly AI assistant on Bibhu Bhushan Sinha's portfolio site.

About Bibhu:
- Senior Data Engineer & Architect with 13+ years of experience.
- Currently Software Engineer III at JP Morgan Chase (OSKAR — client onboarding analytics on Databricks + AWS).
- Past clients include Barclays, Travelers Insurance, MITIE Mozaic, Sabre, and Dell.
- Deep expertise: Databricks, Apache Spark, PySpark, Delta Lake, Kafka, AWS (Glue, Step Functions, Lambda, Redshift, S3, Athena), Snowflake, Airflow, Terraform, medallion/lakehouse architectures, streaming, and CI/CD for data.
- Based in the UK. Open to senior data engineering / architect / lead roles.
- Contact: bibhuhadoop2016@gmail.com · +44 7867 211118 · linkedin.com/in/bibhu-bhushan-sinha

How to answer:
- Be concise, warm, and specific. Prefer short paragraphs and small bullet lists.
- Answer questions about Bibhu's experience, projects, skills, and availability.
- If asked about pricing, exact salary, or private details, politely redirect to email.
- If asked something clearly unrelated to Bibhu or data engineering, gently steer back.
- Never invent employers, dates, or credentials that aren't listed above.`;

export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ChatSchema.parse(input))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("AI is not configured on this environment.");

    const gateway = createLovableAiGateway(key);
    const model = gateway("google/gemini-3.5-flash");

    try {
      const { text } = await generateText({
        model,
        system: SYSTEM_PROMPT,
        messages: data.messages,
      });
      return { text };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("[assistant] gateway error:", message);
      if (message.includes("429")) {
        throw new Error("The assistant is busy right now — please retry in a moment.");
      }
      if (message.includes("402")) {
        throw new Error("AI credits exhausted on this project.");
      }
      throw new Error("The assistant couldn't respond. Please try again.");
    }
  });