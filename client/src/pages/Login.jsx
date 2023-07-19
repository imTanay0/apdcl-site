import styles from '../css/Register.module.css'

const Login = () => {
  return (
    <main className={styles.formContainer}>
      <form action="" className={styles.container}>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
      </form>
    </main>
  )
}

export default Login
