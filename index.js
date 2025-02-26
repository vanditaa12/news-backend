require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const NEWS_API_KEY = process.env.NEWS_API_KEY; // Store API key securely

app.get("/news", async (req, res) => {
    try {
        const { country = "us" } = req.query; // Allow country filter
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${NEWS_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching news", error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
