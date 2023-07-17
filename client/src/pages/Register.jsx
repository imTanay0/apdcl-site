import React from 'react'
import styles from '../css/Register.module.css'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <main className={styles.formContainer}>
      <form action="" className={styles.container}>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className={styles.btn}>Sign Up</button>
        <h4>Or</h4>
        <Link to={'/login'}>login</Link>
      </form>
    </main>
  )
}

export default Register
