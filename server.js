const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const PORT = 8080

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

http.listen(PORT, () =>{
    console.log(`Server is running at https://localhost:${PORT}`)
})