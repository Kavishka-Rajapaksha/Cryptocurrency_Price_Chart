import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import storex from './storex';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={storex}>
    <App />
  </Provider>
);
