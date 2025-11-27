import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';




function Callback() {

    const [called, setCalled] = useState(false);  // stops multiple calls of post
    const navigate = useNavigate();

    useEffect(() => {

        if (called) {  // prevent multiple calls
            return;
        }
        else {
            setCalled(true);
        }

        const getToken = async () => {
            const code = new URLSearchParams(window.location.search).get("code");

            if (code) {
                try {
                    const response = await axios.post("https://musicmoodsorter-api.loca.lt/api/token", { code });
                    const {access_token} = response.data;
                    localStorage.setItem("spotify_token", access_token);
                    navigate("/dashboard");
                }
                catch (err) {
                    console.error("error:", err);
                }
            }
            else {
                return;
            }
        }

        getToken();
    }, [called, navigate]);


    return (
        <div>
            <h1>Callback Page</h1>
            <p>Authorizing with Spotify...</p>;
        </div>
    )
}


export default Callback;