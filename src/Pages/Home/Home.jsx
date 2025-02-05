
import { useNavigate } from "react-router-dom"
import ChatInterface from "./ChatInterface"

const Home = () => {
  const navigate = useNavigate()
 const onChatStart = ({chatData, ai})=>{
  if (chatData !== undefined && chatData !== null && chatData.id !== null) {
    navigate(`/chat/${chatData.id}?ai=${ai}`, chatData)
  }
    
 }

  return (
    <div>
       <ChatInterface onChatStart={onChatStart}/>
    </div>
  )
}

export default Home
