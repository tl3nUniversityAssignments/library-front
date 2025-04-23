import { createFileRoute } from '@tanstack/react-router'
import AuthButton from '@/components/auth'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="flex items-center justify-center h-screen">
      <AuthButton />
    </div>
  )
}
