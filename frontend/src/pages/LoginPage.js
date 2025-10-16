function LoginPage() {

    const handleLogin = () => {
        window.location.href = "http://localhost:5000/login";
        
    }

    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={handleLogin}>Login with Spotify</button>
        </div>
    )
}


export default LoginPage;