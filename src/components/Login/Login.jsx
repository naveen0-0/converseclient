import React,{ useState } from 'react'
import styles from './login.module.css'
import axios from 'axios'
import authen2 from './../../assets/authen2.svg'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Login = () => {
  
  const dispatch = useDispatch()
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ msg, setMsg ] = useState("")
  const { loggedIn } = useSelector(state => state.user)

  const LoginpSubmit = async e => {
    e.preventDefault()
    let { data } = await axios.post('http://localhost:5000/auth/login',{ username, password })
    setMsg(data.msg)
    if(data.statusload){
      localStorage.setItem('converse_app_auth_token',data.token)
      dispatch({ type : "UPDATE_USER", payload : data.user })
    }
  }

  if(loggedIn) return <Redirect to="/"/>

  return (
    <div className={styles.container}>
      <div className={styles.svg}>
        <img src={authen2} alt="Login" className={styles.authen2}/>
      </div>
      <div className={styles.formcontainer}>
        <div className={styles.formtitle}>Login to your account</div>
        <div className={styles.feedback}>{msg}</div>
        <form onSubmit={LoginpSubmit} className={styles.form}>
          <div>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required placeholder="Enter your username" className={styles.username}/>
          </div>
          <div>
            <input type="text" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Enter your password" className={styles.password}/>
          </div>
          <input type="submit" value="Login" className={styles.loginbtn}/>
        </form>
      </div>
    </div>
  )
}

export default Login

