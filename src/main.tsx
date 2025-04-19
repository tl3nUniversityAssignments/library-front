import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { Auth0Provider } from "@auth0/auth0-react";

// Import the generated route tree
import { routeTree } from './routeTree.gen'

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <Auth0Provider
        domain="dev-cyoqoi1i1hdlbr5p.us.auth0.com"
        clientId="K1P4HAlTdNbtGcw5JTJGOZRRvGtJUCTz"
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
      <RouterProvider router={router} />
      </Auth0Provider>
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
