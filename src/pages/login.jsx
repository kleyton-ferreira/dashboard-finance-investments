import React, { useContext, useEffect, useState } from 'react'

import PasswordInput from '@/components/password-input'
import { Button } from '@/components/ui/button'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { toast } from 'sonner'
import { AuthContext } from '@/context/auth'

const loginSchema = z.object({
  email: z
    .string()
    .email({
      message: 'O e-mail é inválido.',
    })
    .trim()
    .min(1, {
      message: 'O e-mail é obrigatório',
    }),
  password: z.string().trim().min(6, {
    message: 'A senha deve ter no mínimo 6 caracteres.',
  }),
})

const LoginPage = () => {
  const { user: userText } = useContext(AuthContext)

  const [user, setUser] = useState(null)
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

  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // ESSE useEffcts ME DEIXA LOGADO
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

  const handleSubmit = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (logedUser) => {
        const accessToken = logedUser.tokens.accessToken
        const refreshToken = logedUser.tokens.refreshToken
        setUser(logedUser)
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        toast.success('Login realizado com sucesso!')
      },
      onError: (error) => {
        console.error(error)
      },
    })
  }

  if (user) {
    return <h1>Óla {user.first_name}</h1>
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <h1> {userText} </h1>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Card className="w-[500px]">
            <CardHeader className="mb-4 text-center">
              <CardTitle className="text-3xl"> Faça o login </CardTitle>
              <CardDescription className="text-base">
                Entre ccom sua conta e inserindo seus dados abaixo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={methods.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="pt-5">
              <Button className="w-full text-lg">Fazer login</Button>
            </CardFooter>
          </Card>
          <div className="flex items-center justify-center pt-8">
            <p className="text-lg opacity-50">Ainda não possui uma conta?</p>
            <Button variant="link">
              <Link to="/signup">Crie agora</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default LoginPage
