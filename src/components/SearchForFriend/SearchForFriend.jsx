import React,{ useState } from 'react'
import styles from './searchforfriend.module.css'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function SearchForFriend({ socket }) {

  const [usernameInput, setUsernameInput ] = useState("")
  const [user, setUser] = useState({})
  const { username, chatId } = useSelector(state => state.user)
  const [text, setText] = useState("")
  const [statusNum, setStatusNum ] = useState(null) 

  const getFriends = async e => {
    e.preventDefault()
    let { data } = await axios.post('http://localhost:5000/api/friend/username',{ username : usernameInput }, { headers : { Authorization : localStorage.getItem('converse_app_auth_token')}})
    if(data.statusload){
      setUser(data.user)
      setStatusNum(data.statusnum)
      setText(data.text)
    }
  }

  const sendRequest = (user) => {
    socket.emit('friend_request',{ username:user.username, chatId:user.chatId, whoRequested:username, requestingguychatId:chatId })
    setUser({})
  } 
  

  return (
    <div className={styles.container}>

      <div className={styles.formcontainer}>
        <form onSubmit={getFriends} className={styles.form}>
          <div className={styles.usernamecontainer}>
            <input type="text" value={usernameInput} onChange={e => setUsernameInput(e.target.value)} className={styles.usernameinput} required placeholder="Search for a friend"/>
          </div>
          <button type="submit" className={styles.searchbtn}>search</button>
        </form>
      </div>


      {user.username&&(
        <div className={styles.friend}>

          <div className={styles.imgname}>
            <div className={styles.friendimg}>{user.username[0]}</div>
            <div className={styles.friendname}>{user.username}</div>
          </div> 

          {statusNum === 1 && <div className={styles.friendrequest}>{text}</div>}
          {statusNum === 2 && <div className={styles.friendrequest}>{text}</div>}
          {statusNum === 3 && <div className={styles.friendrequest}>{text}</div>}
          {statusNum === 4 && <button className={styles.friendrequest} onClick={() => sendRequest(user)}>Send</button>}


        </div>

      )}
    </div>
  )
}

