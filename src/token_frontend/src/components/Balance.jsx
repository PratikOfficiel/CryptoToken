import React from "react";
import {useState} from 'react';
import { Principal } from "@dfinity/principal";
import { token_backend as token } from '../../../declarations/token_backend'

function Balance() {

  const [input, setInput] = useState('');
  const [balanceResult, setBalance] = useState('');
  const [isHidden, setHidden] = useState(true);
  
  async function handleClick() {
    const principal = Principal.fromText(input);
    const balance = await token.balanceOf(principal);
    const symbol = await token.getSymbol();
    setBalance(balance.toLocaleString() +" "+ symbol);
    setHidden(false);
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value = {input}
          onChange = {(e) => setInput(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {balanceResult}.</p>
    </div>
  );
}

export default Balance;
