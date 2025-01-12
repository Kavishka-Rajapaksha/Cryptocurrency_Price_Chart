import React from "react";

type CurrencySelectorProps = {
  selectedPair: string;
  onChange: (pair: string) => void;
};

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  selectedPair,
  onChange,
}) => {
  const currencyPairs = ["BTC/USDT", "ETH/USDT", "BNB/USDT", "XRP/USDT"];

  return (
    <div
      style={{
        marginBottom: "11px",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <label
        htmlFor="currency-pair"
        style={{
          display: "block",
          marginBottom: "5px",
          color: "#333333",
          fontWeight: "bold",
          fontSize: "14px",
        }}
      >
        Select Coin
      </label>
      <select
        id="currency-pair"
        value={selectedPair}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #cccccc",
          fontSize: "14px",
          backgroundColor: "#ffffff",
          color: "#333333",
          width: "100%",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          outline: "none",
          transition: "border-color 0.3s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
        onBlur={(e) => (e.target.style.borderColor = "#cccccc")}
      >
        {currencyPairs.map((pair) => (
          <option key={pair} value={pair}>
            {pair}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
