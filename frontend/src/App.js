import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import MyToken from './artifacts/contracts/MyToken.sol/MyToken.json';

const myTokenAddress = 'DEPLOYED_CONTRACT_ADDRESS';

function App() {
  const [balance, setBalance] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    fetchBalance();
  }, []);

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function fetchBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(myTokenAddress, MyToken.abi, provider);
      const balance = await contract.balanceOf(account);
      setBalance(ethers.utils.formatUnits(balance, 18));
    }
  }

  async function transferTokens() {
    if (!recipient || !amount) return;
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(myTokenAddress, MyToken.abi, signer);
      const transaction = await contract.transfer(recipient, ethers.utils.parseUnits(amount, 18));
      await transaction.wait();
      fetchBalance();
    }
  }

  return (
    <div>
      <h1>MyToken DApp</h1>
      <p>Your Balance: {balance} MTK</p>
      <input onChange={e => setRecipient(e.target.value)} placeholder="Recipient Address" />
      <input onChange={e => setAmount(e.target.value)} placeholder="Amount to Transfer" />
      <button onClick={transferTokens}>Transfer Tokens</button>
    </div>
  );
}

export default App;
