import { api } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

export const AuthContext = createContext({
  user: null,
  isInicialized: true,
  login: () => {},
  signup: () => {},
})

// INICIO DE REFATORAÇOES FEITAS AQUI!
// HOOK CUSTOMIZADO PARA USAR NOS COMPONENTES PASSANDO APENAS useAuthContext()!
export const useAuthContext = () => useContext(AuthContext)

// CHAVES  !  accessToken  !  refreshToken
const LOCAL_STORAGE_ACESS_TOKEN_KEY = 'accessToken'
const LOCAL_STORAGE_REFRESH_TOKEN_KEY = 'refreshToken'

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
    mutationFn: async (variales) => {
      const response = await api.post('/users', {
        first_name: variales.firstName,
        last_name: variales.lastName,
        email: variales.email,
        password: variales.password,
      })
      return response.data
    },
  })

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (variables) => {
      const response = await api.post('/users/login', {
        email: variables.email,
        password: variables.password,
      })
      return response.data
    },
  })

  // ESSE useEffcts ME DEIXA LOGADO
  useEffect(() => {
    const init = async () => {
      try {
        setIsInicialized(true)
        const accessToken = localStorage.getItem(LOCAL_STORAGE_ACESS_TOKEN_KEY)
        const refreshToken = localStorage.getItem(
          LOCAL_STORAGE_REFRESH_TOKEN_KEY
        )
        if (!accessToken && !refreshToken) return
        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        setUser(response.data)
      } catch (error) {
        setUser(null)
        removeTokens()
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

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        isInicialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
