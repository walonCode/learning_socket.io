import { useEffect,useState } from "react"
import { io } from "socket.io-client"


const socket = io("http://localhost:3000")

export default function App() {
  const [message, setMessage] = useState("")
  const [username, setUsername] = useState("")
  const [chat, setChat] = useState([])
  const [nameSet, setNameSet] = useState(false)

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to the server")
    })

    //a simple function to save the message to the chat array
    const handleMessage = (data) => {
      setChat((prev) => [...prev, data]);
    };

    //listen for any new messages
    socket.on("chat:message",handleMessage)

    //this the cleanup to avoid double message recieving and or sending
    return () => {
      socket.off('chat:message', handleMessage);
      socket.off('connect');
      socket.off('disconnect');
    };
  },[])

  //send the message to the server using the emit function
  const sendMessage = (e) => {
    e.preventDefault()
    if(message.trim === "")return

    //this is how the data is being sent instead on api calls
    socket.emit("chat:message", { message,username })
    setMessage("")
  }

  const submitUsername = (e) => {
    e.preventDefault()
    if(username.trim === ""){
      return
    }
    setNameSet(true)
  }
  return (
    <div className=" flex flex-col min-h-screen  justify-center items-center">
    {!nameSet ? (
      <form onSubmit={submitUsername}>
        <h2 className="text-center text-3xl mb-4 font-semibold">Enter your username</h2>
        <input 
          type="text"
          value={username}
          onChange={(e)=> setUsername(e.target.value)}
          placeholder="Type a message..."
          required
          className="border-2 h-10 min-w-[400px] px-1 rounded-md"
          /> 
          <button className="border-2 border-blue-500 bg-blue-500 mt-2 font-bold text-white h-10 w-[200px] rounded-full">add me</button>
      </form>
    ):

    (
      <div>
        <div>
          <h1 className="font-bold text-5xl text-center capitalize ">
            {username}
          </h1>
        </div>
        <div className="my-10">
        {chat.map((msg,i) => (
          <div key={i}>
            <h1 className="font-thin">{msg.username}</h1>
            <p className="font-thin">Message: {msg.message}</p>
            <p>Time: {msg.time}</p>
          </div>
        ))}
      </div>

      <div className="flex w-ful mt-10">
        <form className="flex flex-col gap-5" onSubmit={sendMessage}>
          <input 
          type="text"
          value={message}
          onChange={(e)=> setMessage(e.target.value)}
          placeholder="Type a message..."
          required
          className="border-2 h-10 min-w-[400px] px-1 rounded-md"
          /> 
          <button className="border-2 border-blue-500 bg-blue-500 mt-2 font-bold text-white h-10 w-[200px] rounded-full">send message</button>
        </form>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold text-red-500 capitalize " onClick={() => {setNameSet(false); setUsername("")}}>logout</h3>
      </div>
    </div>
    )
} 
    </div>
  )
}
