const bullmq = require('bullmq');

Worker = bullmq.Worker

const worker = new Worker('file-upload-queue', async job => {
  if (job.name === 'cars') {
    console.log(`Job:`, job.data);
  }
},{
  connection: {
    host: 'localhost',
    port: 6379
  }
});