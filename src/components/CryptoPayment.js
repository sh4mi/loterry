import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers, utils } from "ethers";
import axios from "../utils/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import busdContract from './abi.json';

import Radio from "./Radio";
import NavBar from "./layout/Navbar";
import { Container } from "react-bootstrap";
import PaymentInputs from "./PaymentInputs";
import Footer from "./layout/Footer";
import "../styles/payment.css";
import "../styles/crypto-payment.css";
import "../styles/global.css";
import { initOnboard } from "../utils/walletService"
import { faAngleLeft, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { BigNumber } from "ethers";



const CryptoPayment = () => {
  
  const navigate = useNavigate();

  const [selected, setSelected] = useState("usdt");
  const [totalPrice, setTotalPrice] = useState(0);
  const [name, setName] = useState('');

  const [walletAddress, setWalletAddress] = useState(null);
  const [onboard, setOnboard] = useState();
  const [walletConnected, setWalletConnected] = useState(false);
  const [Wallet, setWallet] = useState(null);
  const [provider, setProvider] = useState(null);

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    let _totalPrice = localStorage.getItem('totalPrice');
    let _name = localStorage.getItem('name');
    setTotalPrice(parseFloat(_totalPrice).toFixed(2));
    setName(_name);
  })

  useEffect(() => {
    const _tickets = JSON.parse(localStorage.getItem('tickets'));
    setTickets(_tickets);

    const _onboard = initOnboard({
      address: (address) => {
        console.log('address callback: ', address);
        localStorage.setItem('wallet', address);
        setWalletAddress(address);
        if (!!address) {
        } else {
          setWalletConnected(false);
        }
      },
      network: (network) => {
        console.log('network callback: ', network)
      },
      balance: (balance) => {
        console.log('balance', balance);
      },
      wallet: async (wallet) => {
        if (wallet) {
          setWallet(wallet);
        }
        console.log('wallet', wallet);
        if (wallet.provider) {
          let ethersProvider = new ethers.providers.Web3Provider(wallet.provider);
          setProvider(ethersProvider);
          // setEthersProvider(_ethersProvider);
          // setWallet(new ethers.Wallet(_ethersProvider));
        }
      }
    })

    setOnboard(_onboard);
  }, []);

  const shortenHex = (hex, length = 4) => {
    return `${hex.substring(0, length + 2)}…${hex.substring(
      hex.length - length
    )}`;
  }

  const connectWallet = async () => {
    if (onboard) {
      const walletSelected = await onboard.walletSelect()
      if (!walletSelected) return;

      console.log('wallet selected: ', walletSelected)
      const readyToTransact = await onboard.walletCheck()
      console.log('Wallet selected: ', walletSelected, ' Ready to transact: ', readyToTransact)
      if (walletSelected && readyToTransact) {
        setWalletConnected(true);
      }
    }
  };

  const disconnectWallet = async () => {
    if (onboard) {
      onboard.walletReset();
    }
  }

  const handleWallet = () => {
    if (walletConnected) disconnectWallet();
    else connectWallet();
  }

  const sendETHTransaction = async (value) => {
    console.log('value', value);
    const toAddress = '0x0bbb08a2B4Ed52bacEf7cb079d41baaEa3f71323';
    if (!toAddress) {
      alert('An Ethereum address to send Eth to is required.')
    }

    if (!provider) {
      alert('Provider is required.')
    }

    const signer = provider.getUncheckedSigner()

    const txDetails = {
      to: toAddress,
      value: String(value)
    }

    const rc = await signer.sendTransaction(txDetails);
  }

  const sendUSDTTransction = async (value) => {
    console.log(value);
    const toAddress = '0x0bbb08a2B4Ed52bacEf7cb079d41baaEa3f71323';
    if (!toAddress) {
      alert('An Ethereum address to send Eth to is required.')
    }

    if (!provider) {
      alert('Provider is required.')
    }

    const signer = provider.getUncheckedSigner()

    let contract = new ethers.Contract(
      // '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      '0xb280622A5e26E053a2A054086cc256D60663aA41',
      busdContract.abi,
      signer
    );

    const amount = BigNumber.from((value * 10 ** 6).toFixed(0));

    const rc = await contract.transfer(toAddress, amount);

  }

  const pay = async () => {
    if (!walletConnected) {
      toast.error('Please connect wallet!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }


    
    if (selected === 'usdt') {
      await sendUSDTTransction(parseFloat(totalPrice) + 0.5);
    } else {
      const priceData = await axios.get(
        `/api/token/price`
      );
      const ethPrice = parseFloat(priceData.data.data);
      await sendETHTransaction((parseFloat(totalPrice) + 0.5) * 10 ** 18 / ethPrice);

    }

    console.log('tickets', tickets);

    const email = localStorage.getItem('email');

    axios.post('/api/ticket/payment', {
      name, tickets, email, wallet: walletAddress
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err);
    })

  }

  return (
    <Container style={{paddingTop: "100px"}}>
      <NavBar loginHidden={false} wallet={walletAddress} signinHidden={true} />
      <button className="back-btn" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faAngleLeft} size="lg"/> Back</button>
      <h3 className="main-title">Choose your payment method</h3>
      <div className="main-title-description">
        <p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
      </div>
      <div className="payment-container">
        <div className="payment-method-wrapper">
          <h6>Payment Currency</h6>
          <div className="radio-container">
            <div className="radio-wrapper">
              <Radio
                value="usdt"
                selected={selected}
                text=""
                onChange={setSelected}
              />
              USDT (ERC20)
              <img src="/usdt.png" alt="" />
            </div>
            {/* <div className="radio-wrapper">
              <Radio
                value="btc"
                selected={selected}
                text=""
                onChange={setSelected}
              />
              BTC
              <img src="/btc.png" alt="" />
            </div> */}
            <div className="radio-wrapper">
              <Radio
                value="eth"
                selected={selected}
                text=""
                onChange={setSelected}
              />
              ETH
              <img src="/eth.png" alt="" />
            </div>
          </div>
          <div className="wallet-address">
            <h6>Wallet address</h6>
            <div className="qr-wrapper">
              <img src="./qrcode.png" alt="" />
              <div className="address-wrapper">
                <p className="address">0x0bbb08a2B4Ed52bacEf7cb079d41baaEa3f71323</p>
                <svg className="copy" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z" stroke="#2A7BB6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5" stroke="#2A7BB6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <svg className="link" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.58984 13.51L15.4198 17.49" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.4098 6.50999L8.58984 10.49" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="network">
            <h6>Network</h6>
            <div className="network-id-wrapper">
              <p className="network-id">ETH (ERC20)</p>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 1L21 5L17 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 11V9C3 7.93913 3.42143 6.92172 4.17157 6.17157C4.92172 5.42143 5.93913 5 7 5H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 23L3 19L7 15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 13V15C21 16.0609 20.5786 17.0783 19.8284 17.8284C19.0783 18.5786 18.0609 19 17 19H3" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="payment-checkout">
          <svg className="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7.5 4.21L12 6.81L16.5 4.21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7.5 19.79V14.6L3 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12L16.5 14.6V19.79" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.27002 6.96L12 12.01L20.73 6.96" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 22.08V12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="price">
            <div className="subtotal">
              <p className="payment-checkout-header">Subtotal</p>
              <p className="content">$ {totalPrice}</p>
            </div>
            <div className="tax">
              <p className="payment-checkout-header">Tax</p>
              <p className="content">$ 0.5</p>
            </div>
          </div>
          <div className="description">
            <p className="payment-checkout-header">Description</p>
            <p className="content">Buying Lottery Tickets #</p>
          </div>
          <div className="total-amount">
            <p className="payment-checkout-header">Total amount</p>
            <p className="total-price">$ {(parseFloat(totalPrice) + 0.5).toFixed(2)}</p>
          </div>
          <div className="checkout-payment-button-container">
            <button className='button' onClick={() => handleWallet()}>{walletConnected ? shortenHex(walletAddress) : 'Connect Wallet'}</button>
            <button className='button' style={{marginTop: '16px'}} onClick={() => pay()}>Make Payment</button>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </Container>
  );
};

export default CryptoPayment;
