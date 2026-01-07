import { useMutation } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  LOCAL_STORAGE_ACESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage'
import { UserService } from '@/services/user'

export const AuthContext = createContext({
  user: null,
  isInicialized: true,
  login: () => {},
  signup: () => {},
  signOut: () => {},
})

// INICIO DE REFATORAÇOES FEITAS AQUI!
// HOOK CUSTOMIZADO PARA USAR NOS COMPONENTES PASSANDO APENAS useAuthContext()!
export const useAuthContext = () => useContext(AuthContext)

// FUNÇAO LOCAL STORAGE TOKENS!
const setTokens = (tokens) => {
  localStorage.setItem(LOCAL_STORAGE_ACESS_TOKEN_KEY, tokens.accessToken)
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refreshToken)
}

// FUNÇAO REMOVE TOKENS!
const removeTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACESS_TOKEN_KEY)
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)
}
// FIM DE REFATORAÇOES FEITAS AQUI!

export const AuthContextProvider = ({ children }) => {
  const [isInicialized, setIsInicialized] = useState(true)
  const [user, setUser] = useState(null)

  const signupMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables) => {
      const response = await UserService.signup(variables)
      return response
    },
  })

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (variables) => {
      const response = await UserService.login(variables)
      return response
    },
  })

  console.log({ user })

  // ESSE useEffcts ME DEIXA LOGADO ASSIM QUE O COMPONENTE FOR MONTADO!
  useEffect(() => {
    const init = async () => {
      try {
        setIsInicialized(true)
        const accessToken = localStorage.getItem(LOCAL_STORAGE_ACESS_TOKEN_KEY)
        const refreshToken = localStorage.getItem(
          LOCAL_STORAGE_REFRESH_TOKEN_KEY
        )
        if (!accessToken && !refreshToken) return
        const response = await UserService.me()
        setUser(response)
      } catch (error) {
        setUser(null)
        console.error(error)
      } finally {
        setIsInicialized(false)
      }
    }
    init()
  }, [])

  const signup = (data) => {
    signupMutation.mutate(data, {
      onSuccess: (createUser) => {
        setUser(createUser)
        setTokens(createUser.tokens)
        toast.success('Conta criada ccom sucesso!')
      },
      onError: () => {
        toast.error('Erro ao criar conta. tente novamente!')
      },
    })
  }

  const login = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (logedUser) => {
        setUser(logedUser)
        setTokens(logedUser.tokens)
        toast.success('Login realizado com sucesso!')
      },
      onError: (error) => {
        console.error(error)
      },
    })
  }

  const signOut = () => {
    setUser(null)
    removeTokens()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        isInicialized,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
