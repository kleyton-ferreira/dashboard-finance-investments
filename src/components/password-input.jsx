import { EyeIcon, EyeOffIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from '@/components/ui/input'

const PasswordInput = ({ placeholder = 'Digite sua senha' }) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)
  return (
    <div className="relative">
      <Input
        type={passwordIsVisible ? 'text' : 'password'}
        placeholder={placeholder}
      />
      <Button
        variant="ghost"
        className="absolute right-0 top-0 my-1 mr-1 h-8 w-8 text-muted-foreground"
        onClick={() => setPasswordIsVisible((prev) => !prev)}
      >
        {passwordIsVisible ? <EyeIcon /> : <EyeOffIcon />}
      </Button>
    </div>
  )
}

export default PasswordInput
