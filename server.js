const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

http.listen(5000, () =>{
    console.log('Server is running at http://localhost:5000')
})