import React from 'react';
import CurrencyConverter from './Component/currencyConverter';
import './App.css'; 

const App = () => {
  return (
    <div className="App">
      <CurrencyConverter />
      <footer className="footer">
        <p>Developed by <a href="https://github.com/Kanha02052002" target="_blank" rel="noopener noreferrer">Kanha Khantaal </a>
|| For source code visit this <a href="https://github.com/Kanha02052002/currencyconverter" target="_blank" rel="noopener noreferrer">Repo</a></p>
      </footer>
    </div>
  );
};

export default App;