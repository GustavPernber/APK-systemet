import express from 'express'
import {main} from './main'
import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../.env") }); // Points to env in dev env

const API_SCRAPER_KEY = process.env.API_SCRAPER_KEY_DEV || process.env.API_SCRAPER_KEY
if (!API_SCRAPER_KEY) throw new Error("No API_SCRAPER_KEY in env");
 

export const router = express.Router()

router.get('/', (req, res) => {
    console.log('the root in console!');
    res.send('Welcome to the root!')
})

router.get('/run', async (req, res) => {
    if (req.headers["api_scraper_key"] !== API_SCRAPER_KEY ) return res.status(401).send("API_SCRAPER_KEY is required in header.")
    res.send("Starting process")
    await main()
    return
})

