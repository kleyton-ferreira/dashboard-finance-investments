import { api } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { createContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

export const AuthContext = createContext({
  user: null,
  login: () => {},
  signup: () => {},
})

export const AuthContextProvider = ({ children }) => {
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

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        if (!accessToken && !refreshToken) return
        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        setUser(response.data)
      } catch (error) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        console.error(error)
      }
    }
    init()
  }, [])

  const signup = (data) => {
    signupMutation.mutate(data, {
      onSuccess: (createUser) => {
        const accessToken = createUser.tokens.accessToken
        const refreshToken = createUser.tokens.refreshToken
        setUser(createUser)
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        toast.success('Conta criada ccom sucesso!')
      },
      onError: () => {
        toast.error('Erro ao criar conta. tente novamente!')
      },
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user: user,
        login: () => {},
        signup: signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
