const express = require('express');
const fs = require('fs');
const axios = require('axios');

const app = express();
const PORT = 3000;

const POLYGON_API_KEY = 'RESBSvGWtX6b80rbk1mgW7dHAABQpMqf';
const BASE_URL = 'https://api.polygon.io/v2';

const stocks = [
    { symbol: 'ACBAW', refreshInterval: 2000 },  // 2 seconds
    { symbol: 'BCDAW', refreshInterval: 3000 }, // 3 seconds
];

const stockPrices = {};

const fetchStockPrices = async (symbol) => {
    try {
        const response = await axios.get(`${BASE_URL}/aggs/ticker/${symbol}/range/1/day?unadjusted=true&apiKey=${POLYGON_API_KEY}`);
        const openPrice = response.data.results[0].o;
        stockPrices[symbol] = { open: openPrice, lastUpdated: Date.now() };
    } catch (error) {
        console.error(`Failed to fetch data for ${symbol}: ${error.message}`);
    }
};

const updateStockPrices = () => {
    setInterval(() => {
        stocks.forEach((stock) => {
            if (!stockPrices[stock.symbol] || Date.now() - stockPrices[stock.symbol].lastUpdated > stock.refreshInterval) {
                fetchStockPrices(stock.symbol);
            }
        });
    }, 1000); // Check every second
};

app.get('/stocks', (req, res) => {
    const stocksData = stocks.map((stock) => ({
        symbol: stock.symbol,
        open: stockPrices[stock.symbol] ? stockPrices[stock.symbol].open : 0,
    }));
    res.json(stocksData);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    updateStockPrices();
});
