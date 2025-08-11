import { Worker } from "bullmq";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { chunkit } from "semantic-chunking";
import { QdrantVectorStore } from "@langchain/qdrant";
import { QdrantClient } from "@qdrant/js-client-rest";
import { Document } from "@langchain/core/documents";
import { OllamaEmbeddings } from "@langchain/ollama";
import { SelfQueryRetriever } from "langchain/retrievers/self_query";
import { QdrantTranslator } from "@langchain/community/structured_query/qdrant";
 
let Retriever;

const worker = new Worker('file-upload-queue', async (job) => {
   // console.log(`Job:`, job.data);
    const data = JSON.parse(job.data)
    const path = data.path
    
    const loader = new PDFLoader(path, {
      splitPages: false
    })
    
    const doc = await loader.load()
    const text = doc[0].pageContent
    //console.log(text)

    const document = [
      {document_name: data.originalname,
      document_text: text
      }
    ]

    const chunks = await chunkit(document, {
      maxTokenSize: 300,
      similarityThreshold: 0.5
    })

    const docs = chunks.map(chunk => {
      return new Document({
        pageContent: chunk.text,
        metadata: {
          document_name: chunk.document_name,
          document_id: chunk.document_id
        }
      })
    });
    console.log(docs)

    const client = new QdrantClient({ 
      url: "http://localhost:6333",
      //checkCompatibility: false
    });

    const embeddings = new OllamaEmbeddings({
      model: "mxbai-embed-large", // Default value
      baseUrl: "http://localhost:11434", // Default value
    });

    console.log("Done")
    console.log(await embeddings.embedQuery("Hello"));
    const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
      url: "http://localhost:6333",
      collectionName: "pdf-rag",
    })

    await vectorStore.addDocuments(docs)
    console.log("Vector store added")
},{
  connection: {
    host: 'localhost',
    port: 6379
  }
});

export default Retriever