import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  setSelectedPair,
  setStartDate,
  setEndDate,
  setChartData,
  setLoading,
  setError,
} from './store';
import CurrencySelector from './components/CurrencySelector';
import DateRangePicker from './components/DateRangePicker';
import PriceChart from './components/PriceChart';
import axios from 'axios';
import { format } from 'date-fns';

interface KlineEntry {
  0: number;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
}

interface CryptoState {
  selectedPair: string;
  startDate: string;
  endDate: string;
  labels: string[];
  data: number[];
  loading: boolean;
  error?: string;
}

interface RootState {
  crypto: CryptoState;
}

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedPair, startDate, endDate, labels, data, loading } = useSelector(
    (state: RootState) => state.crypto
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const startTime = new Date(startDate).getTime();
        const endTime = new Date(endDate).getTime();
        const symbol = selectedPair.replace('/', '');

        const response = await axios.get(
          `https://api.binance.com/api/v3/klines`,
          {
            params: {
              symbol,
              interval: '1d',
              startTime,
              endTime,
            },
          }
        );

        if (response.data.length === 0) {
          dispatch(setChartData({ labels: [], data: [] }));
          alert('No data available for the selected range.');
          return;
        }

        const fetchedLabels = response.data.map((entry: KlineEntry) =>
          format(new Date(entry[0]), 'yyyy-MM-dd')
        );

        const fetchedData = response.data.map((entry: KlineEntry) =>
          parseFloat(entry[4])
        );

        dispatch(setChartData({ labels: fetchedLabels, data: fetchedData }));
      } catch (error) {
        console.error('Error fetching data:', error);
        dispatch(setError('Failed to fetch data.'));
        alert('Failed to fetch data. Please try again.');
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [selectedPair, startDate, endDate, dispatch]);

  return (
    <div
      style={{
        backgroundColor: '#f4f4f9',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: '20px auto',
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <h1
        style={{
          color: '#3550a7',
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: '800',
          marginBottom: '30px',
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Cryptocurrency Price Chart
      </h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '20px',
        }}
      >
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onChange={(start, end) => {
            dispatch(setStartDate(start));
            dispatch(setEndDate(end));
          }}
        />
        <CurrencySelector
          selectedPair={selectedPair}
          onChange={(pair) => dispatch(setSelectedPair(pair))}
        />
      </div>
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {loading ? (
          <p style={{ textAlign: 'center', color: '#2563eb' }}>Loading...</p>
        ) : (
          <PriceChart labels={labels} data={data} />
        )}
      </div>
    </div>
  );
};

export default App;
