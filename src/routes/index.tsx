import { createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'
import LoginButton from '@/components/login'
import LogoutButton from '@/components/logout'
import Profile from '@/components/profile'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center">
      <div>
        <LoginButton />
      </div>
      <div>
        <LogoutButton/>
      </div>
      <div>
        <Profile />
      </div>
    </div>
  )
}
