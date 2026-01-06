import { useEffect, useState } from 'react'

function App() {
  const [msg, setMsg] = useState("")
  const [receiverId, setReceiverid] = useState("")
  const [roomId, setRoomId] = useState("")
  const [socket, setSocket] = useState<WebSocket>();
  const [responce, setResponce] = useState<string[]>([])

  useEffect(()=>{
    const ws = new WebSocket('ws://localhost:8080')
    
    ws.onopen = () => {
      console.log('connected')
    }

    ws.onmessage = (event) => {
      console.log('received:', event.data)
      setResponce((prev) => [...prev, event.data])
    }

    ws.onerror = (error) => {
      console.log(error)
    }
    setSocket(ws);

  },[])

  function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    if(socket){
        socket.send(JSON.stringify({
          room:roomId,
          to: receiverId,
          payload:msg
        }))
        setMsg("")
    }
  }

  return (
    <>
      <div>
        <div>{responce.map(a => <div>{a}</div>)}</div>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Room ID' value={roomId} onChange={(e) => {setRoomId(e.target.value)}} />
          <input type="text" placeholder='Receiver ID' value={receiverId} onChange={(e) => {setReceiverid(e.target.value)}} />
          <input type="text" placeholder='enter ping' value={msg} onChange={(e) => {setMsg(e.target.value)}} />
          <button type='submit'>send</button>
        </form>
      </div>
    </>
  )
}

export default App