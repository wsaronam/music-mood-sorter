const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");

// To test code run this on the backend terminal to get a localtunnel for spotify redirect URI
// npm start
// npx localtunnel --port 5000 --subdomain musicmoodsorter-api




dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;  // I'm now using LocalTunnel to test.  Spotify doesn't allow localhost anymore.


// redirects user to spotify login
app.get("/login", (req, res) => {
    const scopes = "user-library-read playlist-modify-private playlist-modify-public";
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    res.redirect(authUrl);
});


// just for testing
app.get("/", (req, res) => {
    res.send("backend is running");
});


// get access token using auth code
app.post("/api/token", async (req, res) => {
    const code = req.body.code;
    const authHeader = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code")
    params.append("code", code);
    params.append("redirect_uri", REDIRECT_URI);


    try {
        const response = await axios.post("https://accounts.spotify.com/api/token", params, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${authHeader}`,
            },
        });
        res.json(response.data);
        console.log(response.data);
    }
    catch (error) {
        res.status(400).json({ error: error.response.data });
    }
});


// to check valididy of token and permissions
app.get("/api/check-token", async (req, res) => {
    try {
        const token = req.query.token;
        if (!token) {
            return res.status(400).json({ error: "missing token query param" });
        }

        const resp = await axios.get("https://api.spotify.com/v1/me", {
            headers: {Authorization: `Bearer ${token}` },
        });

        res.json(resp.data);
    }
    catch (err) {
        console.log(err);
    }
});



app.listen(5000, () => console.log("Server running"));