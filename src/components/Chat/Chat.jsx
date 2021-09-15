import React,{ useEffect, useState } from 'react'
import styles from './chat.module.css'
import { useSelector } from 'react-redux'
import FriendRequest from '../FriendRequest/FriendRequest'
import { BsPerson } from 'react-icons/bs'

export default function Chat({ socket }) {
  const friends = useSelector(state => state.friends)
  const [open, setOpen] = useState(false);



  return (
    <div className={styles.container}>

      <div className={styles.friendrequests}>
        <div className={styles.person}><BsPerson size="25" onClick={()=>setOpen(!open)}/></div>
        <div className={styles.requestscontainer} style={{ display:open?"block":"none"}}>
          {friends.map((friend, index) => friend.requestAccepted? null : <FriendRequest key={index} socket={socket} friend={friend}/>)}
        </div>
      </div>

      <div>Friends</div>
      <div>{friends.map((friend, index) => friend.requestAccepted?<div key={index}>{friend.username}</div>: null)}</div>
    </div>
  )
}
