import { useEffect } from "react";
import axios from "axios";




function Dashboard() {

    useEffect(() => {

        const getUser = async () => {
            try {
                const token = localStorage.getItem("spotify_token");
                const res = await fetch("https://api.spotify.com/v1/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                console.log(data);
            }
            catch (err) {
                console.log(err);
            }
        }

        getUser();
    }, []);

    return (
        <div>
            <h1>Dashboard Page</h1>
        </div>
    )
}


export default Dashboard;