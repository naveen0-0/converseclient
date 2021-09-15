/* eslint-disable react-hooks/exhaustive-deps */
import React,{ useEffect, useState } from 'react'
import styles from './dashboard.module.css'
import io from 'socket.io-client'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Chat from '../Chat/Chat'
import Profile from '../Profile/Profile'
import SearchForFriend from '../SearchForFriend/SearchForFriend'
import axios from 'axios'
import { makeAUserFriend,addMsg } from '../../utils/utils'

let newSocket;
const DashBoard = () => {
  const dispatch = useDispatch()
  const [socket, setSocket] = useState(null)
  const { loggedIn, chatId, username } = useSelector(state => state.user)
  const [component, setComponent] = useState(null)
  const [loading,setLoading] = useState(true)
  const friends = useSelector(state => state.friends)



  useEffect(() => {
    newSocket = io('http://localhost:5000',{ query : { chatId }})
    setComponent(<Chat socket={newSocket}/>)
    setSocket(newSocket)
    setLoading(false)
    return () => {
      newSocket.close()
      newSocket.off()
    }
  },[])

  //* Write all the [on] socket methods here
  useEffect(() => {
    newSocket.on('friend_request', (data)=>{ 
      dispatch({type:"ADD_FRIEND",payload:data.friend})
    })
    
    newSocket.on('friend_request_success', data =>{
      dispatch({type:"ADD_FRIEND",payload:data.friend})
    })

    newSocket.on('accept_friend_request', data => {
      dispatch({type:"UPDATE_FRIENDS",payload:makeAUserFriend(friends,data.chatId)})
    })
    
    newSocket.on('accept_friend_request_success', data => {
      dispatch({type:"UPDATE_FRIENDS",payload:makeAUserFriend(friends,data.friendChatId)})
    })

    //! Sending messages (Working on this)
    newSocket.on('send_message',data => {
      console.log("Client 2");
      console.log(data);
    })
    
    newSocket.on('send_message_success',data => {
      console.log("Client 1");
      console.log(data);
    })

  },[])


  if(!loggedIn) return <Redirect to="/signup"/>

  if(loading) return <div>loading.....</div>

    return (
      <div>
      <div>{username}</div>
      <div>{chatId}</div>
      <div className={styles.tabs}>
        <div onClick={() => {setComponent(<SearchForFriend socket={socket}/>)}} className={styles.searchtab}>search</div>
        <div onClick={() => {setComponent(<Chat socket={socket}/>)}} className={styles.chattab}>chat</div>
        <div onClick={() => {setComponent(<Profile socket={socket}/>)}} className={styles.profiletab}>profile</div>
      </div>
      {component}
    </div>
  )
}


export default DashBoard