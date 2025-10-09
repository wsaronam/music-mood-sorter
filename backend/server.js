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
const REDIRECT_URI = "http;//localhost:3000/callback";



app.listen(5000, () => console.log("Server running"));