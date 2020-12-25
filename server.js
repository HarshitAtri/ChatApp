const express =require('express')
const app=express()
const http=require('http').createServer(app)
const PORT=process.env.PORT || 3000
app.use(express.static(__dirname + '/public'))
http.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})


// socket io
const io= require('socket.io')(http)
io.on('connection',(socket)=>{
    console.log("connected")
    // listen from client
 socket.on('message',(msg)=>{
     socket.broadcast.emit('message',msg)
 })
})

