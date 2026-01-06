import React from 'react'
import { useAuthContext } from '@/context/auth'
import { Navigate } from 'react-router'

const HomePage = () => {
  const { user, isInicialized } = useAuthContext()

  if (isInicialized) return null

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      <h1>Home Page ( Parabéns! )</h1>
    </div>
  )
}

export default HomePage
