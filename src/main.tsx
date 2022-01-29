import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GlobalModal } from './context/globalModal';

ReactDOM.render(
  <React.StrictMode>
    <GlobalModal>
      <App />
    </GlobalModal>
  </React.StrictMode>,
  document.getElementById('root')
);
