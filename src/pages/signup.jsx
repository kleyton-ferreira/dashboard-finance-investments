import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

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

const Signup = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="w-[500px]">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Crie a sua conta</CardTitle>
          <CardDescription className="text-base">
            Insira seus dados abaixo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <Input placeholder="Digite seu nome" />
          <Input placeholder="Digite seu sobrenome" />
          <Input placeholder="Digite seu email" />
          <PasswordInput />
          <PasswordInput placeholder="Digite sua senha novamente" />
        </CardContent>

        <div className="items-top flex gap-3 px-7 py-1">
          <Checkbox id="terms-2" defaultChecked />
          <div className="grid gap-2">
            <label
              htmlFor="terms-2"
              className="text-sm text-muted-foreground opacity-75"
            >
              Ao clicar em “Criar conta”, você aceita
              <a href="#" className="p-2 text-primary-foreground underline">
                nosso termo de uso e política de privacidade
              </a>
            </label>
          </div>
        </div>

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
    </div>
  )
}

export default Signup
