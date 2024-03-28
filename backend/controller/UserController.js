const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = class UserController {
  // Para pegar todos os users do Banco
  static async getAllUsers(req, res) {
    const users = await User.find()

    res.status(200).json({ message: "All Users", users })
  }

  // Registrar um user
  static async registerUser(req, res) {
    // {name, email, password, confirmpassword} que virão do front
    const { name, email, password, confirmpassword } = req.body

    // Validations
    if (!name) {
      res.status(422).json({ message: 'O Nome é obrigatório!' })
      return
    }
    if (!email) {
      res.status(422).json({ message: 'O E-mail é obrigatório!' })
      return
    }
    if (!password) {
      res.status(422).json({ message: 'A Senha é obrigatória!' })
      return
    }
    if (!confirmpassword) {
      res.status(422).json({ message: 'A Confirmação de Senha é obrigatória!' })
      return
    }
    if (password !== confirmpassword) {
      res.status(422).json({ message: 'A Confirmação de Senha e a Senha são incompatíveis!' })
      return
    }

    // Vai fazer uma busca no banco
    const userExists = await User.findOne({ email: email })

    if (userExists) {
      res.status(422).json({ message: 'Por favor, utilize outro E-mail!' })
      return
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // Preenchendo a class de criação de User
    const user = new User({
      name,
      email,
      password: passwordHash
    })

    try {
      // Criando o user no banco
      const newUser = await user.save()
      // res.status(200).json({ message: "Usuário Cadastrado" })
      // Cria um token para o user
      await createUserToken(newUser, req, res)
    } catch (error) {
      console.log('Erro ao criar user: ', + error)
      res.status(500).json({ message: error })
    }
  }

  // Logar um user existente
  static async loginUser(req, res) {
    // {email, password} que virão do front
    const { email, password } = req.body

    if (!email) {
      res.status(422).json({ message: 'O E-mail é obrigatório!' })
      return
    }
    if (!password) {
      res.status(422).json({ message: 'A Senha é obrigatória!' })
      return
    }

    // Existe?
    const user = await User.findOne({ email: email })

    if (!user) {
      res.status(422).json({ message: 'E-mail inexistente!' })
      return
    }

    // Comparar as senhas
    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
      res.status(422).json({ message: 'Senha inválida!' })
      return
    }

    // logar o user com o token dele
    await createUserToken(user, req, res)
  }

  // Pegar informações do user pelo seu token
  static async getUser(req, res) {
    let currentUser

    // O browser fica com o token guardado.
    console.log(req.headers.authorization)

    // Se tiver algum token
    if (req.headers.authorization) {
      const token = getToken(req)
      // Com o token guardado busca o dono do token, coletando suas informações
      const decoded = jwt.verify(token, 'nossosecret')

      // Buscando o user pelo seu id
      currentUser = await User.findById(decoded.id)
      // Escondendo a senha
      currentUser.password = undefined
    }
    else {
      // Caso não venha um user
      currentUser = null
    }

    res.status(200).send(currentUser)
  }

  static async updateUser(req, res) {
    // let currentUser

    // // O browser fica com o token guardado.
    // console.log(req.headers.authorization)

    // // Se tiver algum token
    // if (req.headers.authorization) {
    //   const token = getToken(req)
    //   // Com o token guardado busca o dono do token, coletando suas informações
    //   const decoded = jwt.verify(token, 'nossosecret')

    //   // Buscando o user pelo seu id
    //   currentUser = await User.findById(decoded.id)
    //   // Escondendo a senha
    //   currentUser.password = undefined
    // }
    // else {
    //   currentUser = null
    // }

    // console.log(currentUser)
    const id = req.params.id
    const { name, email } = req.body
    const user = {}

    // Validations
    if (!name) {
      res.status(422).json({ message: 'O Nome é obrigatório!' })
      return
    }
    user.name = name

    if (!email) {
      res.status(422).json({ message: 'O E-mail é obrigatório!' })
      return
    }
    user.email = email

    await User.updateOne({ _id: id }, {$set: user})

    res.status(200).json({ message: 'Usuário Atualizado'})

  }
}