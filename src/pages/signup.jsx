import React from 'react'
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

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

// COMPONENTE .. INPUT ! PASSWORD..
import PasswordInput from '@/components/password-input'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router'
import { Checkbox } from '@/components/ui/checkbox'
import { z } from 'zod'

const signupSchema = z.object({
  firstName: z.string().trim().min(1, {
    message: 'O nome é obrigátorio.',
  }),
  lastName: z.string().trim().min(1, {
    message: 'O sobrenome é obrigátorio.',
  }),
  email: z
    .string()
    .email({
      message: 'O e-mail é inválido.',
    })
    .trim()
    .min(1, {
      message: 'O e-mail é obrigátorio.',
    }),

  password: z.string().trim().min(6, {
    message: 'A senha deve ter no mínimo 6 caracteres.',
  }),
  passwordConfirmation: z.string().trim().min(6, {
    message: 'A confirmação da senha e obrigátorio.',
  }),

  terms: z.boolean().refine((value) => value === true, {
    message: 'Você precisa aceitar os termos.',
  }),
})

const handleSubmit = (data) => {
  console.log(data)
}

const Signup = () => {
  const methods = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      terms: false,
    },
  })

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Card className="w-[500px]">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Crie a sua conta</CardTitle>
              <CardDescription className="text-base">
                Insira seus dados abaixo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <FormField
                control={methods.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu sobrenome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
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

              <FormField
                control={methods.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmação de senha</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Digite sua senha novamente"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-x-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="grid gap-2">
                      <FormLabel
                        htmlFor="terms-2"
                        className={`relative top-[5px] text-sm text-muted-foreground opacity-75 ${methods.formState.errors.terms && 'text-red-600'} `}
                      >
                        Ao clicar em “Criar conta”, você aceita
                        <a
                          href="#"
                          className={`p-2 text-primary-foreground underline ${methods.formState.errors.terms && 'text-red-600'}`}
                        >
                          nosso termo de uso e política de privacidade
                        </a>
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="pt-5">
              <Button className="w-full text-lg">Criar conta</Button>
            </CardFooter>
            <div className="flex items-center justify-center text-base">
              <p className="text-muted-foreground opacity-50">
                Já possui uma conta?
              </p>
              <Button className="text-ring" variant="link" asChild>
                <Link to="/login">Faça login</Link>
              </Button>
            </div>
          </Card>
        </form>
      </Form>
    </div>
  )
}

export default Signup
