import { Worker } from "bullmq";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { chunkit } from "semantic-chunking";

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

    console.log(chunks)
},{
  connection: {
    host: 'localhost',
    port: 6379
  }
});