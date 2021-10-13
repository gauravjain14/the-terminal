import "./App.css";
//import logo from './logo.svg';
import { useMemo } from "react";

import Home from "./Home";

import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolletExtensionWallet,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { createTheme, ThemeProvider } from "@material-ui/core";

const REACT_APP_CANDY_MACHINE_CONFIG = "GKfdzpKDwv3zmtpSCYq2h6ahyH29xPDDgZegJmxak1yx"
const REACT_APP_CANDY_MACHINE_ID = "H7JZ9y2g4erMracrjXSBb7ZLJtEnapZKkMizCK8GURyy"
const REACT_APP_TREASURY_ADDRESS = "FoPP2uq46qw7j9cd5NGxqM8Mf3X1KF8NUvpiNVYosUvD"
const REACT_APP_CANDY_START_DATE = "1632528720"

const REACT_APP_SOLANA_NETWORK = "devnet"
const REACT_APP_SOLANA_RPC_HOST = "https://explorer-api.devnet.solana.com"


const treasury = new anchor.web3.PublicKey(
  REACT_APP_TREASURY_ADDRESS!
);

const config = new anchor.web3.PublicKey(
  REACT_APP_CANDY_MACHINE_CONFIG!
);

const candyMachineId = new anchor.web3.PublicKey(
  REACT_APP_CANDY_MACHINE_ID!
);

const network = REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const rpcHost = REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const startDateSeed = parseInt(REACT_APP_CANDY_START_DATE!, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const theme = createTheme({
  palette: {
    type: 'dark',
  },
  overrides: {
    MuiButtonBase: {
      root: {
        justifyContent: 'flex-start',
      },
    },
    MuiButton: {
      root: {
        textTransform: undefined,
        padding: '12px 16px',
      },
      startIcon: {
        marginRight: 8,
      },
      endIcon: {
        marginLeft: 8,
      },
    },
  },
});

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSlopeWallet(),
      getSolflareWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network })
    ],
    []
  );

  var MediaQuery = require('react-responsive');
  return (
    <div>
        <ThemeProvider theme={theme}>
          <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect={true}>
              <WalletDialogProvider>
                <Home
                  candyMachineId={candyMachineId}
                  config={config}
                  connection={connection}
                  startDate={startDateSeed}
                  treasury={treasury}
                  txTimeout={txTimeout}
                />
              </WalletDialogProvider>
            </WalletProvider>
          </ConnectionProvider>
        </ThemeProvider>
    </div>
  );

  /*return (
      <ThemeProvider theme={theme}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect={true}>
            <WalletDialogProvider>
              <Home
                candyMachineId={candyMachineId}
                config={config}
                connection={connection}
                startDate={startDateSeed}
                treasury={treasury}
                txTimeout={txTimeout}
              />
            </WalletDialogProvider>
          </WalletProvider>
        </ConnectionProvider>
      </ThemeProvider>
  );*/
};

export default App;
