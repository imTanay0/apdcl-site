import React, { useState } from 'react'
import styles from '../css/Register.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = async (e) => {
    try {
      e.preventDefault()

      console.log(name, email, password)

      await axios.post(
        'https://apdcl-site-server.onrender.com/api/v1/user/register',
        {
          name,
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

      console.log('Registered Successful')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <main className={styles.formContainer}>
      <form className={styles.container} onSubmit={submitHandler}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            type="text"
            id="name"
            className={styles.input}
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
          Sign Up
        </button>
        <h4>Or</h4>
        <Link to={'/login'}>Login</Link>
      </form>
    </main>
  )
}

export default Register
