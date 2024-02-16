import React, {useState} from "react";
import { token_backend as token } from '../../../declarations/token_backend';
import { Principal } from '@dfinity/principal';

function Transfer() {

  const [id, setId] = useState('');
  const [amount, setAmount] = useState('');
  const [isDisabled, setDisability] = useState(false);
  const [response, setResponse] = useState('');
  
  async function handleClick() {
    setDisability(true);
    setResponse('');

    const reciever = Principal.fromText(id);
    const sum = Number(amount);

    const res = await token.transfer(reciever,sum);

    setResponse(res);
    setDisability(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value = {id}
                onChange = {(e)=> setId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value = {amount}
                onChange = {(e)=> setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled}>
            Transfer
          </button>
          <p>{response}</p>
        </p>
      </div>
    </div>
  );
}

export default Transfer;
