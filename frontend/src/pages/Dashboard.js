import { useEffect, useState } from "react";
import axios from "axios";




function Dashboard() {

    const [user, setUser] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [moodsTracks, setMoodsTracks] = useState([]);

    useEffect(() => {

        const getData = async () => {
            try {
                const token = localStorage.getItem("spotify_token");
                console.log("Access token:", token);

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
                const tracksDataMap = tracksData.items.map(item => item.track);
                setTracks(tracksDataMap);


                // get mood-categorized songs
                const tracksIds = tracksDataMap.map(track => track.id);
                console.log(tracksIds);
                //const moodsRes = await fetch(`https://api.spotify.com/v1/audio-features?ids=${tracksIds.join(",")}`, {
                // const moodsRes = await fetch(`https://api.spotify.com/v1/audio-features?ids=7MhJJfA2Mfj1WJjrmX1UIv`, {
                //     headers: { Authorization: `Bearer ${token}`, },
                // });
                // const moodsData = await moodsRes.json();
                // console.log(moodsData);
                //setMoodsTracks(moodsData.items.map(item => item.track));
                //console.log(moodsData);

            }
            catch (err) {
                console.error("Error getting data: " + err);
            }
        }

        getData();
    }, []);

    


    if (!user) {
        return <div>Loading your Spotify data...</div>;
    }

    return (
        <div>
            <h1>Dashboard Page</h1>
            <h1>Welcome, <a href={user.external_urls.spotify} target="_blank">{user.display_name}</a></h1>
            <img 
                src={user.images?.[0]?.url || "https://trackify.am/_next/image?url=%2Fuser.webp&w=640&q=75"} 
                alt="profile_picture"
                width="150"
            />

            <h2>Liked Songs</h2>
            <ul>
                {tracks.map((track) => (
                    <li key={track.id}>
                        {track.name} - {track.artists[0].name}
                        {/* <audio controls src={track.preview_url}></audio> */}
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default Dashboard;