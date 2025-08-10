// retriever.js
import { QdrantClient } from "@qdrant/js-client-rest";
import { QdrantVectorStore } from "@langchain/qdrant";
import { Ollama } from "@langchain/ollama";
import { QdrantTranslator } from "@langchain/community/structured_query/qdrant";
import { SelfQueryRetriever } from "langchain/retrievers/self_query";
import { OllamaEmbeddings } from "@langchain/ollama";

export async function loadRetriever() {
  const client = new QdrantClient({ url: "http://localhost:6333" });

  const embeddings = new OllamaEmbeddings({
    model: "mxbai-embed-large",
    baseUrl: "http://localhost:11434"
  });

  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      client,
      collectionName: "pdf-rag"
    }
  );

  const llm = new Ollama({
    model: "llama3",
    baseUrl: "http://localhost:11434"
  });

  return SelfQueryRetriever.fromLLM({
    llm,
    vectorStore,
    structuredQueryTranslator: new QdrantTranslator()
  });
}
