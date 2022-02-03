import React from "react";
import { useWeb3React } from '@web3-react/core';

import { Form, TextInput, Button, InlineLoading } from 'carbon-components-react';

export default function Balance({ contract }) {
  const { account: currentAccount } = useWeb3React();
  const [currentAccountBalance, setCurrentAccountBalance] = React.useState(0);

  const [givenAccount, setGivenAccount] = React.useState('');
  const [givenAccountBalance, setGivenAccountBalance] = React.useState(0);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [description, setDescription] = React.useState('Submitting...');

  React.useEffect(() => {
    if (contract && currentAccount) {
      getCurrentAccountBalance();
    }
  }, [contract, currentAccount]);

  const getCurrentAccountBalance = async () => {
    try {
      const balance = await getBalance(currentAccount);
      setCurrentAccountBalance(balance)
    } catch (error) {
      console.log(error)
    }
  }

  const getGivenAccountBalance = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const balance = await getBalance(givenAccount);
      if (balance) {
        setGivenAccountBalance(balance)
        setDescription('Submitted!');
        setSuccess(true);
      }
    } catch (error) {
      console.log(error)
      setDescription('Error!');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSuccess(false);
        setDescription('Submitting...');
      }, 2000);
    }
  }

  const reset = () => {
    setGivenAccount('')
    setGivenAccountBalance(0)
  }

  const getBalance = async (account) => {
    return await contract.methods.balanceOf(account).call();
  }
  return (
    <React.Fragment>
      <p>Your current balance is {currentAccountBalance} tokens</p>
      <Form onSubmit={getGivenAccountBalance}>
        <TextInput
          id='givenAccount'
          labelText={'Account'}
          value={givenAccount}
          onChange={(e) => setGivenAccount(e.target.value)}
        />
        <div style={{ display: 'flex' }}>
          <Button kind="secondary" type="button" disabled={isSubmitting} onClick={reset}>
            Reset
          </Button>
          {isSubmitting || success ? (
            <InlineLoading
              style={{ marginLeft: '1rem' }}
              description={description}
              status={success ? 'finished' : 'active'}
            />
          ) : (
            <Button type="submit" disabled={!contract || givenAccount.length !== 42}>
              Check Balance
            </Button>
          )}
        </div>
      </Form>
      {!!givenAccount && !!givenAccountBalance && (
        <p>Balance for the account is {givenAccountBalance} tokens</p>
      )}
    </React.Fragment>
  );
}