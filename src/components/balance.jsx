import React from 'react'
import { UserService } from '@/services/user'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from 'lucide-react'

import BalanceItem from './balance-item'
import { useAuthContext } from '@/context/auth'

const Balance = () => {
  const [searcheParams] = useSearchParams()
  const { user } = useAuthContext()
  const { data } = useQuery({
    queryKey: ['balance', user.id],
    queryFn: () => {
      const from = searcheParams.get('from')
      const to = searcheParams.get('to')
      return UserService.getBalance({ from, to })
    },
  })
  console.log({ data })

  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-6">
      <BalanceItem
        label="Saldo"
        icon={<WalletIcon size={18} />}
        amaout={data?.balance}
      />
      <BalanceItem
        label="Ganhos"
        icon={<TrendingUpIcon size={18} />}
        amaout={data?.earnings}
      />
      <BalanceItem
        label="Gastos"
        icon={<TrendingDownIcon size={18} />}
        amaout={data?.expenses}
      />
      <BalanceItem
        label="Investimentos"
        icon={<PiggyBankIcon size={18} />}
        amaout={data?.investments}
      />
    </div>
  )
}

export default Balance
