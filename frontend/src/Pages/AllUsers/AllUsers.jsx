import { Link } from 'react-router-dom'
import styles from './AllUsers.module.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'

const AllUsers = () => {
  const [users, setUser] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/user/allusers').then((res) => {
      setUser(res.data.users)
    })
    console.log(users)
  }, [])

  return (
    <main className={styles.container}>
      <section>
        <h1>Todos Usuários</h1>
        <div className={styles.users}>
          {users.map((user, index) => (
            <div className={styles.user}>
              <h2>Usuário: {index + 1}</h2>
              <p className={styles.name}><span>Nome: </span>{user.name}</p>
              <p className={styles.email}><span>E-mail: </span>{user.email}</p>
            </div>
          ))}
        </div>
        <Link to='/'>Home</Link>
      </section>
    </main>
  )
}

export default AllUsers
