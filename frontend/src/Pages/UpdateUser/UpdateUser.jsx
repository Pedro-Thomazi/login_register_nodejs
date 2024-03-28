import { useContext, useEffect, useState } from 'react'
import styles from './UpdateUser.module.scss'
import { Context } from '../../Context/UserContext'
import { Link } from 'react-router-dom'
import axios from 'axios'

const UpdateUser = () => {
  const [user, setUser] = useState({})
  const [token] = useState(localStorage.getItem('token') || '')
  const { updateUser } = useContext(Context)

  useEffect(() => {
    // Pega os dados do user pelo token e coloca em uma variável
    axios.get('http://localhost:5000/user/getuser', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setUser(res.data)
    })
  }, [token])

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    updateUser(user)
  }


  return (
    <main className={styles.container}>
      <section>
        <h1>Atualizar Perfil</h1>
        <form onSubmit={handleSubmit} className='form'>
          <div>
            <input type="text" name='name' required onChange={handleChange} value={user.name} />
            <label>Nome</label>
          </div>
          <div>
            <input type="email" name='email' required onChange={handleChange} value={user.email} />
            <label>E-mail</label>
          </div>
          <input type="submit" value="Atualizar" />
        </form>
        <Link to='/'>Home</Link>
      </section>
    </main>
  )
}

export default UpdateUser
