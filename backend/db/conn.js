const mongoose = require('mongoose')

async function main() {
  // Conecta, ou cria, com o banco de dados
  await mongoose.connect('mongodb://localhost:27017/loginregister')
  console.log('Conectou ao Mongoose!')
}

// Chama a função
main().catch((err) => {
  console.log('Erro ao conectar com o Mongoose: ' + err)
})

module.exports = mongoose