const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')
const redis = require('redis')
const bullmq = require('bullmq')

const Queue = bullmq.Queue

const queue = new Queue('file-upload-queue',{
    connection: {
        host: 'localhost',
        port: 6379
    }
});

const client = redis.createClient({
    url: "redis://localhost:6379",
});

client.on("error", (err) => console.log("Redis Client Error", err));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        console.log(file)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${uniqueSuffix}-${file.originalname}.pdf`)
    }
})

const upload = multer({storage: storage})

const port = 9323

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/upload/pdf', upload.single('pdf'), (req, res)=>{
    queue.add('file-ready', JSON.stringify({
        filename: req.file.originalname,
        destination: req.file.destination,
        path: req.file.path
    }))
    res.send({message: "File uploaded successfully"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})