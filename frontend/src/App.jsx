import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import FlashMessage from './Components/FlashMessage/FlashMessage'
import { UserProvider } from './Context/UserContext.jsx'
import UpdateUser from './Pages/UpdateUser/UpdateUser.jsx'
import AllUsers from './Pages/AllUsers/AllUsers.jsx'

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <FlashMessage />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/update-user/:id' element={<UpdateUser />} />
          <Route path='/all-users' element={<AllUsers />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
