import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/librarian')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/librarian"!</div>
}
