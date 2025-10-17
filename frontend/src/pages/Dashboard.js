import { useEffect, useState } from "react";
import axios from "axios";




function Dashboard() {

    const [user, setUser] = useState(null);
    const [tracks, setTracks] = useState([]);

    useEffect(() => {

        const getData = async () => {
            const token = localStorage.getItem("spotify_token");

            // get user profile
            const userRes = await fetch("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const userData = await userRes.json();
            setUser(userData);


            // get liked songs
            const tracksRes = await fetch("https://api.spotify.com/v1/me/tracks?limit=50", {
                headers: { Authorization: `Bearer ${token}`, },
            });
            const tracksData = await tracksRes.json();
            return tracksData.items.map(item => item.track);
        }

        getData();
    }, []);

    


    return (
        <div>
            <h1>Dashboard Page</h1>
            <h1>Welcome, {user.display_name}</h1>
            <img src={user.images?.[0]?.url} alt="profile_picture"/>

            <h2>Liked Songs</h2>
            <ul>
                {tracks.map((track) => (
                    <li key={track.id}>
                        {track.name} - {track.artists.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default Dashboard;