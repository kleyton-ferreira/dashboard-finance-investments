import React from 'react'
import { useAuthContext } from '@/context/auth'
import { Navigate } from 'react-router'
import { Button } from '@/components/ui/button'

const HomePage = () => {
  const { user, isInicialized, signOut } = useAuthContext()

  if (isInicialized) return null

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <h1>Óla {user.first_name} </h1>
      <Button onClick={signOut}>Sair</Button>
    </>
  )
}

export default HomePage
