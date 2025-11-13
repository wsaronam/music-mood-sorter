const axios = require("axios");



// const token = "";
// const token = "api_token_goes_here";

const songTracks = [
    '7MhJJfA2Mfj1WJjrmX1UIv', '1TiZWEsxN85yLJBq56K8mG', '4KeWQpIWKHu4gZL8nDJfPE', '67hRnmNKhZd58KWPWDxTa1', 
    '34bM8eF9L5b6n9jFWSp0lQ', '0O0ieeprNUzIbiOSnDg5Z0', '5wGLphubt3CitprFM2DYf1', '6VINmnhzfy08VJKkzzkLHN', 
    '3Te8uLyit6X3ncNW8Fp3K2', '69yfbpvmkIaB10msnKT7Q5', '1lgN0A2Vki2FTON5PYq42m', '3LlAyCYU26dvFZBDUIMb7a', 
    '4G8gkOterJn0Ywt6uhqbhp', '3FPNYMxcRX7qbBG6Vp1J1L', '4AM0BpOYJrQ0ooIDG29OTm', '57vIdcXRgjXOTAosUWbUt3', 
    '71hjtLgl6DITQO0KcYUoXs', '214d84vwqQSUA09bNtIgRr', '69uxyAqqPIsUyTO8txoP2M', '6Knv6wdA0luoMUuuoYi2i1', 
    '2vDT1uU6hZgdp3PbWGr0Xy', '4V05j7HDUU2bZQwDOeIySh', '27SdWb2rFzO6GWiYDBTD9j', '2N0NifjyXAdMOB4KBGvBJ6', 
    '1i1fxkWeaMmKEB4T7zqbzK', '6kVKXoC9cnMuuqSWe72b4G', '2PJl08JUFESHtoBDESrmLC', '7ouMYWpwJ422jRcDASZB7P'
];


async function TestSongs() {
    const workingSongs = [];
    const failedSongs = [];


    fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then(res => res.json())
        .then(console.log);



    for (const id of songTracks) {
        try {
            const res = await axios.get(`https://api.spotify.com/v1/audio-features/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data && res.data.id) {
                workingSongs.push(id);
            }
            else {
                failedSongs.push(id);
            }
            
        }
        catch (err) {
            console.log(err.message);
            failedSongs.push(id);
        }
    }

    console.log("working tracks:", workingSongs);
    console.log("failed tracks:", failedSongs);
}


TestSongs();