import { useAuth0 } from "@auth0/auth0-react";

export default function AuthButton() {
    const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();

    if (isLoading || isAuthenticated)
        return <button className="login-btn" onClick={() => handleLogout(logout)}>Log Out</button>
    else
        return <button className="login-btn" onClick={() => loginWithRedirect()}>Log In</button>
}

function handleLogout(logout) {
    let callbackPath = window.location.pathname;
    if (callbackPath == '/myrankings')
        callbackPath = '/rankings';
    logout({ returnTo:  window.location.origin + callbackPath})
    console.log(callbackPath)
}