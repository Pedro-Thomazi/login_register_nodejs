import { useContext, useEffect, useState } from 'react'
import styles from './Home.module.scss'
import { Link } from 'react-router-dom'
import { Context } from '../../Context/UserContext'
import axios from 'axios'

const Home = () => {
  const [user, setUser] = useState({})
  const [token] = useState(localStorage.getItem('token') || '')
  const { authenticate, logout } = useContext(Context)

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

  return (
    <main className={styles.homeContainer}>
      <section>
        {authenticate ? (
          <>
            <h1>Olá,</h1>
            <h1>{user.name}</h1>
            <Link to={`/update-user/${user._id}`} className={styles.btnUpdate}>Atualizar Perfil</Link>
            <Link to='/all-users' className={styles.btnUpdate}>Ver Usuários</Link>
            <button onClick={logout}>Sair</button>
          </>
        ) : (
          <>
            <h1>Faça seu Login</h1>
            <Link to='/login'>Login</Link>
          </>
        )}
      </section>
    </main>
  )
}

export default Home
