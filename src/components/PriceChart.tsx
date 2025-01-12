import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type PriceChartProps = {
  labels: string[];
  data: number[];
};

const PriceChart: React.FC<PriceChartProps> = ({ labels, data }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Closing Price",
        data,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        borderWidth: 3,
        tension: 0,
        pointRadius: 5,
        pointBackgroundColor: "#4CAF50",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            family: "'Roboto', sans-serif",
            weight: "bold",
          },
          color: "#333",
        },
      },
      title: {
        display: true,
        text: "Cryptocurrency Closing Prices",
        font: {
          size: 18,
          family: "'Roboto', sans-serif",
          weight: "bold",
        },
        color: "#3fa735",
      },
      tooltip: {
        backgroundColor: "#2563eb",
        titleFont: {
          size: 14,
          family: "'Roboto', sans-serif",
        },
        bodyFont: {
          size: 12,
          family: "'Roboto', sans-serif",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
          font: {
            size: 14,
            family: "'Roboto', sans-serif",
            weight: "bold",
          },
          color: "#666666",
        },
        ticks: {
          font: {
            size: 12,
            family: "'Roboto', sans-serif",
          },
          color: "#666666",
        },
        grid: {
          color: "rgba(200, 200, 200, 0.5)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Closing Price (USD)",
          font: {
            size: 14,
            family: "'Roboto', sans-serif",
            weight: "bold",
          },
          color: "#666666",
        },
        ticks: {
          font: {
            size: 12,
            family: "'Roboto', sans-serif",
          },
          color: "#666666",
          callback: (value) => `$${value}`,
        },
        grid: {
          color: "rgba(200, 200, 200, 0.5)",
        },
      },
    },
  };

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Line options={options} data={chartData} />
    </div>
  );
};

export default PriceChart;
