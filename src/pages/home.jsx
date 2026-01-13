import React from 'react'
import { useAuthContext } from '@/context/auth'
import { Navigate } from 'react-router'

import Header from '@/components/header'
import DataSelection from '@/components/date-selection'
import Balance from '@/components/balance'

import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

const HomePage = () => {
  const { user, isInicialized, signOut } = useAuthContext()

  if (isInicialized) return null

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <Header />
      <div className="flex items-center justify-between px-8 py-[36px]">
        <h2>Dashboard</h2>
        <div className="flex items-center gap-4">
          <DataSelection />
          <Button>
            Nova transação <PlusIcon />
          </Button>
        </div>
      </div>
      <Balance />
    </>
  )
}

export default HomePage
