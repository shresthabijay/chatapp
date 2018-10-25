const http=require("http")
const port=8000
const app=require("./app")
const chat=require("./chat")
const socketHandler=require("./socketHandler")

const server=http.createServer(app)

const io=require("socket.io")(server)

io.on('connection',(socket)=>{socketHandler(socket,io)})

server.listen(port,()=>{
    console.log("Server started at port "+port)
})