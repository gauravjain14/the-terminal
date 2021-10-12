import { useEffect, useState } from "react";
import styled from "styled-components";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import { Button, CircularProgress, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import sol_terminal from './sol_terminal.jpeg';
import icon1 from "./assets/images/ICON.png";
import twitter from "./assets/images/twitter.png";
import discord from "./assets/images/Discord-Logo-White.png";
import './fonts/VT323/VT323-Regular.ttf';
import "./Home.css";
//import CSS from 'csstype';

import * as anchor from "@project-serum/anchor";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";

import {
  CandyMachine,
  awaitTransactionSignatureConfirmation,
  getCandyMachineState,
  mintOneToken,
  shortenAddress,
} from "./candy-machine";

const ConnectButton = styled(WalletDialogButton)`
  width: 150px;
  border-radius: 10px;
`;

const CounterText = styled.span``; // add your styles here

const WalletDetails = styled.div`
      color: white;
      text-align: right;
      margin-top: 20px;
      margin-right: 40px;
      padding: 5px;
    `;

const Container = styled.div`
    display: flex;
    background-color: rgba(0,0,0,1);
    flex-direction: column;
    width: 100vw;
    padding-bottom: 36px;
  `;

const TheTerminal = styled.span`
  font-family: VT323;
  font-style: normal;
  font-weight: 400;
  color: rgba(255,255,255,1);
  align-self: center;
  text-align: center;
  font-size: 110px;
  margin-top: 20px;
`;

const Image = styled.img`
  height: 48px;
  margin-top: 6px;
  object-fit: contain;
`;

const Image2 = styled.img`
  height: 43px;
  margin-top: 6px;
  object-fit: contain;
`;

const ImageRow = styled.div`
  height: auto;
  flex-direction: row;
  display: block;
  margin: 0 auto;
`;

const MintContainer = styled.div`
  width: auto;
  height: 48px;
  align-items: middle;
  display: none;
`;

const Group = styled.div`
  height: 144px;
  flex-direction: row;
  display: block;
  margin: 0 auto;
  margin-top: 36px;
`;

const Image3 = styled.img`
  height: 100%;
  margin: 10px;
  object-fit: contain;
`;

const Image4 = styled.img`
  height: 100%;
  margin: 10px;
  object-fit: contain;
`;

const Image5 = styled.img`
  height: 100%;
  margin: 10px;
  object-fit: contain;
`;

const Image6 = styled.img`
  height: 100%;
  margin: 10px;
  object-fit: contain;
`;

const Text3 = styled.span`
  font-family: VT323;
  font-style: normal;
  font-weight: 400;
  color: rgba(255,255,255,1);
  font-size: 48px;
  margin: 0 auto;
  margin-top: 36px;
`;

const Text = styled.span`
  font-family: VT323;
  font-style: normal;
  font-weight: 400;
  color: rgba(255,255,255,1);
  font-size: 36px;
  width: 720px;
  height: auto;
  text-align: center;
  margin-top: 120px;
  align-self: center;
`;

const Text2 = styled.span`
  font-family: VT323;
  font-style: normal;
  font-weight: 400;
  color: rgba(63,255,0,1);
  font-size: 30px;
  width: 960px;
  height: auto;
  text-align: center;
  align-self: center;
  margin-top: 24px;
  margin-bottom: 120px;
`;

const Dots = styled.span`
  font-family: VT323;
  font-style: normal;
  font-weight: 400;
  color: rgba(251,248,248,1);
  font-size: 74px;
  align-self: center;
`;

const Group2 = styled.div`
  width: auto;
  height: 469px;
  flex-direction: column;
  align-self: center;
  align-items: stretch;
  justify-content: space-between;
  margin-top: 48px;
  display: flex;
  position: relative;
  padding-bottom: 36px;
`;

const Spaceman = styled.span`
  font-family: VT323;
  font-style: normal;
  font-weight: 400;
  color: rgba(255,255,255,1);
  line-height: 84px;
  font-size: 36px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  text-align: center;
`;

const Intelligence = styled.span`
  font-family: VT323;
  font-style: normal;
  font-weight: 400;
  color: rgba(255,255,255,1);
  line-height: 84px;
  font-size: 36px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  text-align: center;
`;

const SpacemanRow = styled.div`
  height: 84px;
  flex-direction: row;
  display: flex;
`;

const Rect2 = styled.div`
  width: 282px;
  height: 143px;
  background-color: rgba(63,255,0,1);
`;

const Rect4 = styled.div`
  width: 282px;
  height: 143px;
  background-color: rgba(63,255,0,1);
  margin-left: 109px;
`;

const Rect2Row = styled.div`
  height: 143px;
  flex-direction: row;
  display: flex;
`;

const Planet = styled.span`
  font-family: VT323;
  font-style: normal;
  font-weight: 400;
  color: rgba(255,255,255,1);
  line-height: 84px;
  font-size: 36px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  text-align: center;
`;

const Spaceship = styled.span`
  font-family: VT323;
  font-style: normal;
  font-weight: 400;
  color: rgba(255,255,255,1);
  line-height: 84px;
  font-size: 36px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  text-align: center;
`;

const PlanetRow = styled.div`
  height: 84px;
  flex-direction: row;
  display: flex;
  margin-top: 12px;
`;

const Rect3 = styled.div`
  width: 282px;
  height: 143px;
  background-color: rgba(63,255,0,1);
`;

const Rect5 = styled.div`
  width: 282px;
  height: 143px;
  background-color: rgba(63,255,0,1);
  margin-left: 109px;
`;

const Rect3Row = styled.div`
  height: 143px;
  flex-direction: row;
  display: flex;
`;

const TextStack = styled.div`
  width: 969px;
  height: 576px;
  margin-top: 117px;
  margin-left: 476px;
  position: relative;
`;

const MintButton = styled(Button)``; // add your styles here

export interface HomeProps {
  candyMachineId: anchor.web3.PublicKey;
  config: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  startDate: number;
  treasury: anchor.web3.PublicKey;
  txTimeout: number;
}

const Home = (props: HomeProps) => {
  const [balance, setBalance] = useState<number>();
  const [isActive, setIsActive] = useState(false); // true when countdown completes
  const [isSoldOut, setIsSoldOut] = useState(false); // true when items remaining is zero
  const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT

  const [itemsAvailable, setItemsAvailable] = useState(0);
  const [itemsRedeemed, setItemsRedeemed] = useState(0);
  const [itemsRemaining, setItemsRemaining] = useState(0);

  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });

  const [startDate, setStartDate] = useState(new Date(props.startDate));

  const wallet = useAnchorWallet();
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();

  const onMint = async () => {
    try {
      setIsMinting(true);
      if (wallet && candyMachine?.program) {
        const mintTxId = await mintOneToken(
          candyMachine,
          props.config,
          wallet.publicKey,
          props.treasury
        );

        const status = await awaitTransactionSignatureConfirmation(
          mintTxId,
          props.txTimeout,
          props.connection,
          "singleGossip",
          false
        );

        if (!status?.err) {
          setAlertState({
            open: true,
            message: "Congratulations! Mint succeeded!",
            severity: "success",
          });
        } else {
          setAlertState({
            open: true,
            message: "Mint failed! Please try again!",
            severity: "error",
          });
        }
      }
    } catch (error: any) {
      // TODO: blech:
      let message = error.msg || "Minting failed! Please try again!";
      if (!error.msg) {
        if (error.message.indexOf("0x138")) {
        } else if (error.message.indexOf("0x137")) {
          message = `SOLD OUT!`;
        } else if (error.message.indexOf("0x135")) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
          setIsSoldOut(true);
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }

      setAlertState({
        open: true,
        message,
        severity: "error",
      });
    } finally {
      if (wallet) {
        const balance = await props.connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
      setIsMinting(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (wallet) {
        const balance = await props.connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    })();
  }, [wallet, props.connection]);

  useEffect(() => {
    (async () => {
      if (!wallet) return;

      const {
        candyMachine,
        goLiveDate,
        itemsAvailable,
        itemsRemaining,
        itemsRedeemed,
      } = await getCandyMachineState(
        wallet as anchor.Wallet,
        props.candyMachineId,
        props.connection
      );

      setItemsAvailable(itemsAvailable);
      setItemsRemaining(itemsRemaining);
      setItemsRedeemed(itemsRedeemed);

      setIsSoldOut(itemsRemaining === 0);
      setStartDate(goLiveDate);
      setCandyMachine(candyMachine);
    })();
  }, [wallet, props.candyMachineId, props.connection]);

  return (
    <Container>
      <WalletDetails>
        {wallet && (
          <p>Wallet {shortenAddress(wallet.publicKey.toBase58() || "")}</p>
        )}

        {wallet && <p>Balance: {(balance || 0).toLocaleString()} SOL</p>}

        {wallet && <p>Total Available: {itemsAvailable}</p>}

        {wallet && <p>Redeemed: {itemsRedeemed}</p>}

        {wallet && <p>Remaining: {itemsRemaining}</p>}
      </WalletDetails>
      <ImageRow>

        <a href="https://discord.gg/YVem6zUS"
          target="_blank" rel="noopener noreferrer"
          style={{ height: '48px', width: '100%' }}>
          <Image src={discord}></Image>
        </a>
        <a href="https://twitter.com"
          target="_blank" rel="noopener noreferrer"
          style={{ height: '43px', width: '100%', marginLeft: '15px' }}>
          <Image2 src={twitter}></Image2>
        </a>
        <MintContainer>
          {!wallet ? (
            <ConnectButton>Connect Wallet</ConnectButton>
          ) : (
              <MintButton
                disabled={isSoldOut || isMinting || !isActive}
                //disabled={isMinting || !isActive}
                //{isSoldOut ? }
                onClick={onMint}
                variant="contained"
              >
                {isSoldOut ? (
                  "SOLD OUT"
                ) : isActive ? (
                  isMinting ? (
                    <CircularProgress />
                  ) : (
                      "MINT"
                    )
                ) : (
                      <Countdown
                        date={startDate}
                        onMount={({ completed }) => completed && setIsActive(true)}
                        onComplete={() => setIsActive(true)}
                        renderer={renderCounter}
                      />
                    )}
              </MintButton>
            )}
        </MintContainer>
      </ImageRow>
      <TheTerminal>The Terminal</TheTerminal>
      <Group>
        <Image3 src={icon1}></Image3>
        <Image4 src={icon1}></Image4>
        <Image5 src={icon1}></Image5>
        <Image6 src={icon1}></Image6>
      </Group>
      <Text3>
        Rebooting...
      </Text3>
      <Text>
        4,321 Records of a Lost Civilization Survived on the Solana
        Blochchain...
      </Text>
      <Dots>...</Dots>
      <Text2>
        In the vast depths of the unknown galaxy, a knowledge hub known as "The Terminal" existed. It was the result of centuries of information assimilation by billions of species. It's contents were vast and unyielding, but over time the Galactic Emperor and his closest associates took control and used it's power to conquer new worlds through genocide and resource control. A ragtag band of rebels located "The Terminal" and managed to trigger The Big Wipe to destroy all the information to restore equality. A few knowledge keepers of the terminal managed to backup its corrupting core memory comprising of 4321 entries and fled to an undocumented system planet to reboot the system. These NFTs are the 4321 pieces of galactic information that survived The Big Wipe.
      </Text2>
      <Group2>
        <SpacemanRow>
          <Spaceman>Spaceman</Spaceman>
          <Intelligence>Intelligence</Intelligence>
        </SpacemanRow>
        <Rect2Row>
          <Rect2></Rect2>
          <Rect4></Rect4>
        </Rect2Row>
        <PlanetRow>
          <Planet>Planet</Planet>
          <Spaceship>Spaceship</Spaceship>
        </PlanetRow>
        <Rect3Row>
          <Rect3></Rect3>
          <Rect5></Rect5>
        </Rect3Row>
      </Group2>
    </Container>
  );
};

interface AlertState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
}

const renderCounter = ({ days, hours, minutes, seconds, completed }: any) => {
  return (
    <CounterText>
      {hours + (days || 0) * 24} hours, {minutes} minutes, {seconds} seconds
    </CounterText>
  );
};
export default Home;