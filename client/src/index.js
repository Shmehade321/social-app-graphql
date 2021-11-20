import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ApolloClientProvider from './AplloClientProvider';

ReactDOM.render(
  <React.StrictMode>
    <ApolloClientProvider />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
