function LoginPage() {

    const handleLogin = () => {
        //window.location.href = "http://localhost:5000/login";
        window.location.href = "https://musicmoodsorter-api.loca.lt/login";
        //window.location.href = "http://127.0.0.1:5000/login";
    }

    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={handleLogin}>Login with Spotify</button>
        </div>
    )
}


export default LoginPage;