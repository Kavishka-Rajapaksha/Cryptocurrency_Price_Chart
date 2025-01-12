import React, { useState, useEffect } from "react";
import CurrencySelector from "./components/CurrencySelector";
import DateRangePicker from "./components/DateRangePicker";
import PriceChart from "./components/PriceChart";
import axios from "axios";
import { format } from "date-fns";

type KlineData = [
  number, // Open time
  string, // Open price
  string, // High price
  string, // Low price
  string, // Close price
  string, // Volume
  number, // Close time
  string, // Quote asset volume
  number, // Number of trades
  string, // Taker buy base asset volume
  string, // Taker buy quote asset volume
  string // Ignore
];

const App: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState<string>("BTC/USDT");
  const [startDate, setStartDate] = useState<string>("2025-01-01");
  const [endDate, setEndDate] = useState<string>("2025-01-10");
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const startTime = new Date(startDate).getTime();
        const endTime = new Date(endDate).getTime();
        const symbol = selectedPair.replace("/", "");

        const response = await axios.get(
          `https://api.binance.com/api/v3/klines`,
          {
            params: {
              symbol,
              interval: "1d",
              startTime,
              endTime,
            },
          }
        );

        if (response.data.length === 0) {
          setLabels([]);
          setData([]);
          alert("No data available for the selected range.");
          return;
        }

        const fetchedLabels = response.data.map((entry: KlineData) =>
          format(new Date(entry[0]), "yyyy-MM-dd") // Open time
        );

        const fetchedData = response.data.map((entry: KlineData) =>
          parseFloat(entry[4]) // Close price
        );

        setLabels(fetchedLabels);
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedPair, startDate, endDate]);

  return (
    <div
      style={{
        backgroundColor: "#f4f4f9",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        maxWidth: "800px",
        margin: "20px auto",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <h1
        style={{
          color: "#3550a7",
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "800",
          marginBottom: "30px",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Cryptocurrency Price Chart
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onChange={(start, end) => {
            setStartDate(start);
            setEndDate(end);
          }}
        />
        <CurrencySelector
          selectedPair={selectedPair}
          onChange={setSelectedPair}
        />
      </div>
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {loading ? (
          <p style={{ textAlign: "center", color: "#2563eb" }}>Loading...</p>
        ) : (
          <PriceChart labels={labels} data={data} />
        )}
      </div>
    </div>
  );
};

export default App;
