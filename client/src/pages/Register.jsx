import React from 'react'
import styles from '../css/Register.module.css'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <main className={styles.formContainer}>
      <form action="" className={styles.container}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            type="text"
            id="name"
            className={styles.input}
            placeholder="Enter your name"
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
