import React from 'react'
import { Link } from 'react-router-dom'
import styles from './navbar.module.css'
import { useSelector } from 'react-redux'

const NavBar = () => {
  const {loggedIn} = useSelector(state => state.user)
  return (
    <div className={styles.auth}>
      <div className={styles.authtitle}>Converse</div>
      {!loggedIn && (
        <div className={styles.authlinks}>
          <Link to="/signup" className={styles.removeUnderline}>
            <div className={styles.signup}>
              signup
            </div>
          </Link>

          <Link to="/login" className={styles.removeUnderline}>
            <div className={styles.login}>
                login
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}

export default NavBar
