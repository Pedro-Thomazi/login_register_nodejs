import { createContext } from "react";
import useAuth from "../Hooks/useAuth.jsx";

// Cria o contexto onde pode-se utilizar os dados do user
const Context = createContext()

function UserProvider({ children }) {
  // Funções do usuário
  const { authenticate, register, logout, login, updateUser } = useAuth()

  return (
    <Context.Provider value={{ authenticate, register, logout, login, updateUser }}>
      {children}
    </Context.Provider>
  )
}

export { Context, UserProvider }