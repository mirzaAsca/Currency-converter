import React, { useState, useEffect } from "react";
import "./App.css";

// Define the API key and request options
var myHeaders = new Headers();
myHeaders.append("apikey", "VoS4euQXl0Gu83LDwk8fbYAGP8p9Mg0F");

const requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

function App() {
  // Set up state variables
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);

  // Fetch the list of currencies from the API
  useEffect(() => {
    async function fetchCurrencies() {
      const response = await fetch(
        `https://api.apilayer.com/exchangerates_data/symbols`,
        requestOptions
      );
      const data = await response.json();
      setCurrencies(Object.keys(data.symbols));
    }

    fetchCurrencies();
  }, []);

  const handleSwitch = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleConvert = async () => {
    try {
      const response = await fetch(
        `https://api.apilayer.com/exchangerates_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`,
        requestOptions
      );
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="currency-converter">
      <h1>Currency Converter</h1>
      <div className="dropdown-container">
        <label className="from" htmlFor="from-currency">
          From:
        </label>
        <select
          id="from-currency"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option className="option" key={currency} value={currency}>
              {" "}
              {currency}{" "}
            </option>
          ))}
        </select>
        <div className="switch">
          <button onClick={handleSwitch}>Switch</button>
        </div>
        <label className="to" htmlFor="to-currency">
          To:
        </label>
        <select
          id="to-currency"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option className="option" key={currency} value={currency}>
              {" "}
              {currency}{" "}
            </option>
          ))}
        </select>
      </div>
      <div className="input-container">
        <label htmlFor="amount">Amount:</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button onClick={handleConvert}>Convert</button>
      <p className="result">
        {result ? `${amount} ${fromCurrency} = ${result} ${toCurrency}` : ""}
        {console.log(result)}
      </p>
    </div>
  );
}

export default App;
