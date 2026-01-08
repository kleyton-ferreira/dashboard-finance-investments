import React from 'react'
import { useAuthContext } from '@/context/auth'
import { Navigate } from 'react-router'

import Header from '@/components/header'

const HomePage = () => {
  const { user, isInicialized, signOut } = useAuthContext()

  if (isInicialized) return null

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <Header />
    </>
  )
}

export default HomePage
