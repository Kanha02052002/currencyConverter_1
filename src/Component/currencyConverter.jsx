// src/CurrencyConverter.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CurrencyConverter.css'; // Import custom styles

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('0');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [rate, setRate] = useState(null);
  const [result, setResult] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    // Fetch the list of currencies
    axios.get('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => {
        setCurrencies(Object.keys(response.data.rates));
      })
      .catch(error => console.error('Error fetching currencies:', error));
  }, []);

  useEffect(() => {
    // Fetch the conversion rate once on initialization
    if (fromCurrency && toCurrency) {
      axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => {
          setRate(response.data.rates[toCurrency]);
        })
        .catch(error => console.error('Error fetching rate:', error));
    }
  }, [fromCurrency, toCurrency]);

  const handleNumpadClick = (value) => {
    setAmount((prev) => (prev === '0' ? value : prev + value));
  };

  const handleClear = () => {
    setAmount('0');
    setResult(null); // Clear the result when clearing the input
  };

  const handleConvert = () => {
    if (rate !== null) {
      setResult(amount * rate);
    }
  };

  return (
    <div className="container">
      <div className="converter-box">
        <h1 className="title">Currency Converter</h1>
        <input
          type="text"
          value={amount}
          onFocus={(e) => e.target.classList.add('active')}
          onBlur={(e) => e.target.classList.remove('active')}
          onChange={(e) => setAmount(e.target.value)}
          className="amount-input"
        />
        <div className="currency-selectors">
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="currency-select"
          >
            {currencies.map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
          <span className="to-text">to</span>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="currency-select"
          >
            {currencies.map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>
        <div className="result">
          <button onClick={handleConvert} className="numpad-btn convert-btn">CONVERT</button>
          <button onClick={handleClear} className="numpad-btn clear-btn">CLEAR</button>
          
        </div>
        <div className="numpad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button key={num} onClick={() => handleNumpadClick(num.toString())} className="numpad-btn">{num}</button>
          ))}
          <button onClick={() => handleNumpadClick('0')} className="numpad-btn zero-btn">0</button>
        </div>
        <br />
        <div className="output">
            {result !== null && result !== 0 ? `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}` : ''}
          </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
