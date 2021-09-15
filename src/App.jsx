import React,{ useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//* Components
import NavBar from './components/NavBar/NavBar'
import DashBoard from './components/DashBoard/DashBoard'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import axios from 'axios'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch();

  const getUser = async () => {
    let { data } = await axios.get('http://localhost:5000/auth/getuser',{ headers : { Authorization : localStorage.getItem('converse_app_auth_token')}})
    if(data.statusload){
      dispatch({ type:"UPDATE_USER",payload:data.user})
    }
  }

  const getFriends = async () => {
    let { data } = await axios.get('http://localhost:5000/api/friends',{ headers : { Authorization : localStorage.getItem('converse_app_auth_token')}})
    if(data.statusload){
      dispatch({ type:"UPDATE_FRIENDS",payload:data.friends})
    }
  }
  


  useEffect(() => {
    getUser()
    getFriends()
  }, [])

  return (
    <>
      <Router>
          <NavBar/>
        <Switch>
          <Route path="/signup" exact component={Signup}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/" exact component={DashBoard}/>
        </Switch>
      </Router>
    </>
  )
}

export default App