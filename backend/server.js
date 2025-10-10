import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";



dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/callback";


// redirects user to spotify login
app.get("/login", (req, res) => {
    const scopes = "user-library-read playlist-modify-private playlist-modify-public";
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    res.redirect(authUrl);
});


// get access token using auth code
app.post("/api/token", async (req, res) => {
    const code = req.body.code;

    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code")
    params.append("code", code);
    params.append("redirect_uri", REDIRECT_URI);


    try {
        const response = await axios.post("https://accounts.spotify.com/api/token", params, {
            headers: {
                "Content-Type": "pass",
                Authorization: "Basic " + `${CLIENT_ID}`
            },
        });
        res.json(response.data);
    }
    catch (error) {
        res.status(400).json({ error: error.response.data });
    }
});



app.listen(5000, () => console.log("Server running"));