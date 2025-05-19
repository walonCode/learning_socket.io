import express from "express"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"
import { config } from "dotenv"

config()

//create an express server and http server
// http server is required by socket.io
const app = express()
const server = http.createServer(app)

//app use cors
app.use(cors)

//setting up the socket io server instance with the http server
const io = new Server(server, {
    cors: {
        origin:"http://localhost:5173",
        methods:['GET','POST'],
    }
})

//using the io.on to listen for a connection on the connect 
io.on("connect", (socket) => {
    console.log("✅ Client connected: "+socket.id)

    //socket is listening on the chat:message from the client
    socket.on("chat:message", (data) =>{
        console.log(`Message from ${socket.id}`, data)

        //the recieved message is then broadcasted to all the client using the emit function
        io.emit("chat:message", {
            id:socket.id,
            message:data.message,
            username:data.username,
            time:new Date().toUTCString()
        })
    })
    
})


//starting the server
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})