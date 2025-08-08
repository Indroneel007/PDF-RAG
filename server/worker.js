const { Worker } = require('bullmq');

const worker = new Worker('file-upload-queue', async job => {
  if (job.name === 'cars') {
    console.log(`Job:`, job.data);
  }
}, { concurrency: 100 });