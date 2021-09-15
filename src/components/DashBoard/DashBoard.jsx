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

let newSocket;
const DashBoard = () => {
  const dispatch = useDispatch()
  const [socket, setSocket] = useState(null)
  const { loggedIn, chatId, username } = useSelector(state => state.user)
  const [component, setComponent] = useState(null)
  const [loading,setLoading] = useState(true)

  const getFriends = async () => {
    let { data } = await axios.get('http://localhost:5000/api/friends',{ headers : { Authorization : localStorage.getItem('converse_app_auth_token')}})
    if(data.statusload){
      dispatch({ type:"UPDATE_FRIENDS",payload:data.friends})
    }
  }

  useEffect(() => {
    getFriends()
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
      dispatch({type:"ADD_FRIEND",payload:data.requestedfriend})
      newSocket.emit('friend_request_success',{ acceptedfriend:data.acceptedfriend,chatId:data.requestedfriend.chatId })
    })
    
    newSocket.on('friend_request_success', data =>{
      dispatch({type:"ADD_FRIEND",payload:data})
    })
  },[])



  if(!loggedIn) return <Redirect to="/signup"/>

  if(loading) return <div>loading.....</div>

    return (
      <div>
      <div className={styles.chatId}>{username}</div>
      <div className={styles.chatId}>{chatId}</div>
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