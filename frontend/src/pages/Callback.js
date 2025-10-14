import {useEffect} from "react";
import {useNavigate} from "react-router-dom";




function Callback() {

    const navigate = useNavigate();

    useEffect(() => {
        const getToken = async () => {
            const access_token = "temp";
            localStorage.setItem("spotify_token", access_token);

            navigate("/dashboard");
        }

        getToken();
    }, [navigate]);


    return (
        <div>
            <h1>Callback Page</h1>
            <p>Authorizing with Spotify...</p>;
        </div>
    )
}


export default Callback;