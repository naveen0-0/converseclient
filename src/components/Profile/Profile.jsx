import React,{ useEffect } from 'react'
import styles from './profile.module.css'
import { useDispatch } from 'react-redux'
import axios from 'axios'

export default function Profile({ socket }) {
  const dispatch = useDispatch()

  const Signout = async () => {
    let { data } = await axios.post('http://localhost:5000/auth/signout',{}, {headers : { Authorization : localStorage.getItem('converse_app_auth_token')}}) 
    if(data.statusload){
      localStorage.removeItem('converse_app_auth_token')
      dispatch({type:"UPDATE_USER", payload: data.user})
    }
  }

  return (
    <div className={styles.container}>
      <button onClick={Signout} className={styles.signout}>Signout</button>
    </div>
  )
}
