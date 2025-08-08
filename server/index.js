const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')

const upload = multer({ dest: 'uploads/' })

const port = 9323

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/upload/pdf', upload.single('pdf'), (req, res)=>{
    res.send({message: "File uploaded successfully"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})