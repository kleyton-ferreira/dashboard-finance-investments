import React, { useEffect, useState } from 'react'
import { DatePickerWithRange } from './date-picker-with-ranger'
import { addMonths, format } from 'date-fns'
import { useNavigate, useSearchParams } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'
import { useAuthContext } from '@/context/auth'

const formatDateToQueryParam = (date) => format(date, 'yyyy-MM-dd')

const DataSelection = () => {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuthContext()

  // ESSE CODIGO AQUI ELE ATUALIZA A URL COM A DATA CORRETA QUANDO EU DOU RELOAD NA PAGINA
  const [date, setDate] = useState({
    from: searchParams.get('from')
      ? new Date(searchParams.get('from') + 'T00:00:00')
      : new Date(),
    to: searchParams.get('to')
      ? new Date(searchParams.get('to') + 'T00:00:00')
      : addMonths(new Date(), 1),
  })

  // ESSE USEEFFCT ELE ATUALIZA A URL QUANDO EU SELECIONO UMA DATA
  useEffect(() => {
    if (!date?.from || !date?.to) return
    const queryParams = new URLSearchParams()
    queryParams.set('from', formatDateToQueryParam(date.from))
    queryParams.set('to', formatDateToQueryParam(date.to))
    navigate(`/?${queryParams.toString()}`)
    queryClient.invalidateQueries([
      {
        queryKey: ['balance', user.id],
      },
    ])
  }, [navigate, date, queryClient])

  return (
    <div>
      <DatePickerWithRange value={date} onChange={setDate} />
    </div>
  )
}

export default DataSelection
