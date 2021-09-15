import React,{ useEffect, useState } from 'react'
import styles from './chat.module.css'
import { useSelector, useDispatch } from 'react-redux'
import FriendRequest from '../FriendRequest/FriendRequest'
import { BsPerson } from 'react-icons/bs'
import Friend from '../Friend/Friend'

export default function Chat({ socket }) {
  const dispatch = useDispatch()
  const friends = useSelector(state => state.friends)
  const [open, setOpen] = useState(false);

  const updateSelectedFriend = (friend) => {
    dispatch({ type:"UPDATE_SELECTED_FRIEND",payload:friend})
  }


  return (
    <div className={styles.container}>

      <div className={styles.friendrequests}>
        <div className={styles.person}><BsPerson size="25" onClick={()=>setOpen(!open)}/></div>
        <div className={styles.requestscontainer} style={{ display:open?"block":"none"}}>
          {friends.map((friend, index) => friend.requestAccepted? null : <FriendRequest key={index} socket={socket} friend={friend}/>)}
        </div>
      </div>

      <div className={styles.friends}>
        <div className={styles.friendsnames}>
          {friends.map((friend,index) => {
            if(friend.requestAccepted){
              return <div key={index} className={styles.friendsname} onClick={() => updateSelectedFriend(friend)}>{friend.username}</div>
            }
          })}
        </div>

          <Friend socket={socket}/>
      </div>

    </div>
  )
}

{/* <div>{friends.map((friend, index) => friend.requestAccepted?<div key={index}>{friend.username}</div>: null)}</div> */}