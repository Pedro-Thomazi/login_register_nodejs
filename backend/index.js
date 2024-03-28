const express = require('express')
// Conexão com o Front-end
const cors = require('cors')
const port = 5000

const app = express()

app.use(express.json())

// Conexão a url do Front-end
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))


const UserRouter = require('./router/UserRoutes')
app.use('/user', UserRouter)


app.listen(port, () => console.log('Rodando na Porta: ' + port))