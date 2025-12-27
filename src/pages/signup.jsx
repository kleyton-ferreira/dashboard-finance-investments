import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router'

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
        <CardContent className="space-y-4">
          <Input placeholder="Digite seu nome" />
          <Input placeholder="Digite seu sobrenome" />
          <Input placeholder="Digite seu email" />
          <Input type="password" placeholder="Digite sua senha" />
        </CardContent>
        <CardFooter>
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
