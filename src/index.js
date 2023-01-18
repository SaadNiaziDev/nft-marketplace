import React from 'react';
import ReactDOM from 'react-dom/client';
import { Web3Modal } from '@web3modal/react'
import { WagmiConfig } from 'wagmi'
import './index.css';
import App from './App';
import {
  BrowserRouter,
} from "react-router-dom";
import {ethereumClient,client, walletConnectProjectId } from './wagmi'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <WagmiConfig client={client}>
      <App />
      <Web3Modal
        projectId={walletConnectProjectId}
        ethereumClient={ethereumClient}
      />
    </WagmiConfig>
    </BrowserRouter>
  </React.StrictMode>
);

