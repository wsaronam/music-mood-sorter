import {useEffect} from "react";
import {useNavigate} from "react-router-dom";




function Callback() {

    const navigate = useNavigate();

    useEffect(() => {
        const getToken = async () => {
            const code = new URLSearchParams(window.location.search).get("code");

            if (code) {
                try {
                    const response = await axios.post("https://musicmoodsorter.loca.lt/api/token", { code });
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
    }, [navigate]);


    return (
        <div>
            <h1>Callback Page</h1>
            <p>Authorizing with Spotify...</p>;
        </div>
    )
}


export default Callback;