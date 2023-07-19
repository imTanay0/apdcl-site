import React, { useState } from 'react'
import styles from '../css/Register.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = async (e) => {
    try {
      e.preventDefault()

      console.log(email, password)

      await axios.post(
        'http://localhost:8080/api/v1/user/login',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )

      console.log('Login Successful')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <main className={styles.formContainer}>
      <form className={styles.container} onSubmit={submitHandler}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            className={styles.input}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            className={styles.input}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.btn}>
          Sign In
        </button>
        <h4>Or</h4>
        <Link to={'/login'}>Sign Up</Link>
      </form>
    </main>
  )
}

export default Login
