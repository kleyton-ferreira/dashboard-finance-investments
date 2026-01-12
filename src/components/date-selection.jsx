import React, { useState } from 'react'
import { DatePickerWithRange } from './date-picker-with-ranger'
import { addMonths } from 'date-fns'

const DataSelection = () => {
  const [date, setDate] = useState({
    from: new Date(),
    to: addMonths(new Date(), 1),
  })
  return (
    <div>
      <DatePickerWithRange value={date} onChange={setDate} />
    </div>
  )
}

export default DataSelection
