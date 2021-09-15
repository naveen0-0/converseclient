import React,{ useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './friend.module.css'


export default function Friend({ socket }) {
  const [ msg, setMsg ] = useState("")
  const friend = useSelector(state => state.selectedFriend)
  const { chatId, username } = useSelector(state => state.user)

  const sendMsg = e => {
    if(e.key === 'Enter' && msg.trim() !== ''){
      socket.emit('send_message',{ msg, friendChatId:friend.chatId, username,friendUsername : friend.username })
    }
  }

  if(friend){
    return (
      <div className={styles.chat}>
        <div className={styles.banner}>{friend.username}</div>

        <div className={styles.messageinputcontainer}>
          <input 
            type="text" 
            value={msg} 
            onChange={(e) => setMsg(e.target.value)} 
            onKeyPress={sendMsg} 
            className={styles.messageinput}
            placeholder="Enter your msg"
            required
            autoFocus
          />
        </div>
      </div>
    )
  }

  return (
    <div>
      Private Conversations with your friends and familys
    </div>
  )
}
