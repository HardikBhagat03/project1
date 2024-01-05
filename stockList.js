import React, { useState, useEffect } from 'react';

const StockList = () => {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await fetch('http://localhost:3000/stocks');
                const data = await response.json();
                setStocks(data);
            } catch (error) {
                console.error('Failed to fetch stock data:', error.message);
            }
        };

        fetchStocks();
    }, []);

    return (
        <div>
            <h1>Stock List</h1>
            <ul>
                {stocks.map((stock) => (
                    <li key={stock.symbol}>
                        {stock.symbol}: {stock.open}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StockList;
