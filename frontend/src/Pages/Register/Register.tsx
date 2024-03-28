import { Link, useNavigate } from 'react-router-dom'
import styles from './Register.module.scss'
import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { Context } from '../../Context/UserContext'

const Register = () => {
  const [user, setUser] = useState({})
  const { register } = useContext(Context)
  const navigate = useNavigate()

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    register(user)

  //   try {
  //     const res = await axios.post('http://localhost:5000/user/register', user)
  //     setUser(res.data)
  //     navigate('/')

  //     return res.data
  //   }
  //   catch (error) {
  //     console.log('Erro: ' + error)
  //   }

  //   console.log(user)
  }

  return (
    <main className={styles.container}>
      <section>
        <h1>Registrar-se</h1>
        <form onSubmit={handleSubmit} className='form'>
          <div>
            <input type="text" name='name' required onChange={handleChange} />
            <label>Nome</label>
          </div>
          <div>
            <input type="email" name='email' required onChange={handleChange} />
            <label>E-mail</label>
          </div>
          <div>
            <input type="password" name='password' required onChange={handleChange} />
            <label>Senha</label>
          </div>
          <div>
            <input type="password" name='confirmpassword' required onChange={handleChange} />
            <label>Confirmação de Senha</label>
          </div>
          <input type="submit" value="Cadastrar" />
        </form>
        <p>Já uma conta? <Link to='/login'>Clique Aqui.</Link></p>
      </section>
    </main>
  )
}

export default Register
