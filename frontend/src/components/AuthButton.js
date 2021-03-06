import { useAuth0 } from "@auth0/auth0-react";

export default function AuthButton() {
    const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();

    if (isLoading || isAuthenticated)
        return <button className="login-btn" onClick={() => logout({ returnTo: window.location.href })}>Log Out</button>
    else
        return <button className="login-btn" onClick={() => loginWithRedirect()}>Log In</button>
}