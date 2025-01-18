
import { useEffect,useState } from "react";
import { io }from "socket.io-client"

const socket = io('http://localhost:3000');

export default function App(){
  const [message, setMessage] = useState("")
  const [messageRecieved, setMesssageRecieved] = useState("")

  const [room, setRoom] = useState("")

  const joinRoom = () => {
    if(room !== ""){
      socket.emit("join_room",room)
    }
  }

  const sendMessage = () => {
    socket.emit("send_message", { message, room })
  };

  useEffect(() => {
    socket.on("recieved_message", (data) => {
      setMesssageRecieved(data.message);
    });
    return ()=>{
      socket.off("recieved_message")
    };
  },[])
 
  return(
    <div className="flex flex-col justify-center items-center min-h-screen">
      <main className="">
        <input type="text"
         placeholder="Room Number"
         onChange={(e) => setRoom(e.target.value)}
         />
         <button onClick={joinRoom}>Join Room</button>
        <input  
        placeholder="Message...."  
        onChange={(e) => setMessage(e.target.value)} 
        required
        />
        <button onClick={sendMessage}>Send Message</button>
      </main>
      <section className="pt-[60px]">
        <h1>Messsage Recieved: </h1>
        <p>{messageRecieved}</p>
      </section>
    </div>
  )
}