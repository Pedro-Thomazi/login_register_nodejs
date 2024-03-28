import { Link } from 'react-router-dom'
import styles from './Login.module.scss'
import { useContext, useState } from 'react'
import { Context } from '../../Context/UserContext'

const Login = () => {
  const [user, setUser] = useState({})
  const { login } = useContext(Context)

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    // Função já criado no useAuth
    login(user)
  }


  return (
    <main className={styles.container}>
      <section>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className='form'>
          <div>
            <input type="email" name='email' required onChange={handleChange} />
            <label>E-mail</label>
          </div>
          <div>
            <input type="password" name='password' required onChange={handleChange} />
            <label>Senha</label>
          </div>
          <input type="submit" value="Entrar" />
        </form>
        <p>Não tem uma conta? <Link to='/register'>Clique Aqui.</Link></p>
      </section>
    </main>
  )
}

export default Login
