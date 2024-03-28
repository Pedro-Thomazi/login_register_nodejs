// URL do back-end
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useAuth() {
  const [authenticate, setAuthenticate] = useState();
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')

    // Se vier o token adiciona ele no browser
    if (token) {
      axios.defaults.headers.Authorization = `Bearer ${JSON.stringify(token)}`
      // Usuário autenticado
      setAuthenticate(true)
    }
  }, []);

  async function authUser(data) {
    setAuthenticate(true)

    // Cria um token para o user
    localStorage.setItem('token', JSON.stringify(data.token))

    // Autenticado? Vá para a Home
    navigate('/')
  }

  async function register(user) {
    // Mensagem de sucesso
    let msg = 'Cadastrado!'
    // Tipo 
    let type = 'success'

    try {
      // Cria uma ligação com o back-end, enviando os dados do user para lá
      const data = await axios.post('http://localhost:5000/user/register', user).then((res) => {
        return res.data
      })
      // Usuário criado? Manda os dados para criação do token e autenticação
      await authUser(data)

    } catch (error) {
      // Deu erro? Pega o erro do bach e manda para o front
      msg = error.response.data.message 
      type = 'error'
    }

    setFlashMessage(msg, type)
  }

  async function login(user) {
    let msg = 'Login realizado!'
    let type = 'success'

    try {
      const data = await axios.post('http://localhost:5000/user/login', user).then((res) => {
        return res.data
      })
      await authUser(data)

    } catch (error) {
      msg = error.response.data.message 
      type = 'error'
    }

    setFlashMessage(msg, type)
  }

  async function logout() {
    let msg = 'Saiu!'
    let type = 'success'

    // Deslogando o user manualmente
    setAuthenticate(false)
    // Remove o token
    localStorage.removeItem('token')
    axios.defaults.headers.Authorization = undefined

    navigate('/')
    setFlashMessage(msg, type)
  }

  async function updateUser(user) {
    let msg = 'Atualizado!'
    let type = 'success'

    try {
      await axios.patch(`http://localhost:5000/user/update-user/${user._id}`, user).then((res) => {
        return res.data
      })
      navigate('/')

    } catch (error) {
      msg = error.response.data.message 
      type = 'error'
    }

    setFlashMessage(msg, type)
  }

  return { authenticate, register, logout, login, updateUser }
}