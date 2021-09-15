import React,{ useRef, useState } from 'react'
import styles from './signup.module.css'
import axios from 'axios'
import authen1 from '../../assets/authen1.svg'
import { v4 as uuid } from 'uuid'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Signup = () => {
  const { loggedIn } = useSelector(state => state.user)
  const [ username, setUsername ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ confirmPassword, setConfirmPassword ] = useState("")
  const [ msg, setMsg ] = useState("")
  const confirmPassRef = useRef()
  const [statusload,setStatusload] = useState(false)

  const SignupSubmit = async e => {
    e.preventDefault()
    if(password !==confirmPassword){ setMsg("Password didn't match"); confirmPassRef.current.focus() }
    else{
      let { data } = await axios.post('http://localhost:5000/auth/signup',{ username, email, password,chatId : uuid() })
      setMsg(data.msg)
      if(data.statusload){
      setTimeout(() => {
        setStatusload(true)
        },1000)
      }
    }
  }

  if(statusload) return <Redirect to="/login"/>
  if(loggedIn) return <Redirect to="/"/>
  

  return (
    <div className={styles.container}>

      <div className={styles.svg}>
        <img src={authen1} alt="Signup" className={styles.authen1}/>
      </div>

      <div className={styles.formcontainer}>
          <div className={styles.formtitle}>Create an account</div>
          <div className={styles.feedback}>{msg}</div>
          <form onSubmit={SignupSubmit} className={styles.form}>
            <div>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} required placeholder="Enter your username" className={styles.username}/>
            </div>
            <div>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Enter your email" className={styles.email}/>
            </div>
            <div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Enter your password" className={styles.password}/>
            </div>
            <div>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required placeholder="Confirm your password" className={styles.confirmpassword} ref={confirmPassRef}/>
            </div>
            <input type="submit" value="Signup" className={styles.signupbtn}/>
          </form>
      </div>
    </div>
  )
}

export default Signup
