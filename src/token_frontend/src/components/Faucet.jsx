import React from "react";
import {useState} from 'react';
import { token_backend as token} from '../../../declarations/token_backend';

function Faucet() {

  const [response, setResponse] = useState("Gimme gimme");
  const [isDisabled, setDisability] = useState(false);

  async function handleClick(event) {
    setDisability(true);
    const res = await token.grant();
    setResponse(res);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DINOVA tokens here! Claim 10,000 DINOVA tokens to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {response}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
