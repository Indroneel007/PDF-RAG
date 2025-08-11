import express from "express";
import { loadRetriever } from "../retriever.mjs";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { Ollama } from "@langchain/ollama";

const router = express.Router();

const prompt = PromptTemplate.fromTemplate(`
You are a helpful assistant. Use the provided context to answer the question.
If the answer cannot be found in the context, say "I don't know based on the provided information."

Context:
{context}

Question:
{question}
`);

const llm = new Ollama({
  model: "llama3",
  baseUrl: "http://localhost:11434"
});

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Missing 'question'" });
    }

    const retriever = await loadRetriever();
    const docs = await retriever.invoke(question);

    // Build context from retrieved documents
    const context = docs.map(doc => doc.pageContent).join("\n\n");

    // Create chain (prompt → llm → parser)
    const chain = prompt.pipe(llm).pipe(new StringOutputParser());

    // Generate answer
    const answer = await chain.invoke({ context, question });

    console.log("Answer:", answer);
    res.json({ answer });

  } catch (err) {
    console.error("Error in /chat:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
