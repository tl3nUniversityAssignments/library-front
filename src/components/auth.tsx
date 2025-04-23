import { useAuth0 } from "@auth0/auth0-react"

function LoginButton() {
    const { loginWithRedirect } = useAuth0();

    return (
        <button  className="bg-blue-500 hover:bg-blue-700 text-white font-pold px-2 py-1 rounded" onClick={() => loginWithRedirect()}>Log in</button>
    )
}

function LogoutButton() {
    const { logout } = useAuth0();

    return <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded" onClick={() => logout()}>Log out</button>
}

export default function AuthButton() {
    const { isAuthenticated } = useAuth0();

    return isAuthenticated ? <LogoutButton /> : <LoginButton />
}
