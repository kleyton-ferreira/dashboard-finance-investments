import React from 'react'
import { Card, CardContent } from './ui/card'
import Logo from '@/assets/images/FinTrack.svg'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { useAuthContext } from '@/context/auth'
import { ChevronDownIcon, LogOutIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Header = () => {
  const { user, signOut } = useAuthContext()
  return (
    <>
      <Card>
        <CardContent className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-12">
            <img src={Logo} alt="FinTrack" />
            <h2 className="text-xs text-primary">Dashboard</h2>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="p-6">
                <div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>
                      <p>
                        {user.firstName[0]} {user.lastName[0]}
                      </p>
                    </AvatarFallback>
                  </Avatar>
                </div>
                <p>
                  {user.firstName} {user.lastName}
                </p>
                <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Meu Perfil</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  size="small"
                  className="w-full justify-start"
                  onClick={signOut}
                >
                  <LogOutIcon />
                  Sair
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
    </>
  )
}

export default Header
