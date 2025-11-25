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
                console.log("token: ", token);

                //const tracksFeaturesRes = await axios.get(`https://musicmoodsorter-api.loca.lt/api/audio-features?ids=${tracksIds}`, 
                const tracksFeaturesRes = await axios.get(`http://127.0.0.1:3000/api/audio-features?ids=${tracksIds}`, 
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    },
                )
                console.log("song track features:", tracksFeaturesRes.data);

                // axios.get("https://api.spotify.com/v1/audio-features?ids=4G8gkOterJn0Ywt6uhqbhp", 
                //     {
                //         headers: { Authorization: `Bearer ${token}` },
                //     }
                // )
                // .then(res => console.log(res.data))
                // .catch(err => console.log(err.response.data));
                


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