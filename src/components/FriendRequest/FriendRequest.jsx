import React,{ useEffect, useState } from 'react'
import styles from './friendrequest.module.css'
import { useSelector } from 'react-redux'

export default function FriendRequest({ socket, friend }) {
  const { username } = useSelector(state => state.user)

  const AcceptRequest = () => {
    socket.emit("accept_friend_request",{ chatId : friend.chatId})
  }
  
  const DeclineRequest = () => {
    socket.emit("decline_friend_request",{ chatId : friend.chatId})
  }


  return (
    <div className={styles.request}>
      <div className={styles.imguser}>
        <div className={styles.img}>
          {friend.username[0]}
        </div>
        <div className={styles.username}>
          {friend.username}
        </div>
      </div>
      {friend.whoRequested === username?(
        <div className={styles.acceptordecline}>
          <button className={styles.accept}>Request Sent</button>
        </div>
      ):(
        <div className={styles.acceptordecline}>
          <button className={styles.accept} onClick={AcceptRequest}>accept</button>
          <button className={styles.decline} onClick={DeclineRequest}>decline</button>
        </div>
      )}
    </div>
  )
}
