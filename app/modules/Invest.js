import React from 'react';
import web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { Form, NumberInput, Button, InlineLoading, InlineNotification, NotificationActionButton, Link } from 'carbon-components-react';

const NOTIFICATION_KINDS = {
  SUCCESS: 'success',
  ERROR: 'error',
}

export default function Invest({ contract }) {
  const { account } = useWeb3React();

  const [amount, setAmount] = React.useState(100);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [description, setDescription] = React.useState('Submitting...');

  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);
  const [notificationKind, setNotificationKind] = React.useState('');
  const [notificationTitle, setNotificationTitle] = React.useState('');
  const [notificationSubitle, setNotificationSubitle] = React.useState('');
  const [notificationTx, setNotificationTx] = React.useState(undefined);


  const onSubmit = async (e) => {
    e.preventDefault();
    if (contract) {
      try {
        setIsSubmitting(true);
        const tokenPrice = await contract.methods.tokenPrice().call();
        console.log(`tokenPrice: ${tokenPrice}`);
        const res = await contract.methods.invest().send({
          from: account,
          value: web3.utils.toBN(tokenPrice).mul(web3.utils.toBN(amount)).toString(),
        });
        if (res) {
          console.log(res);
          setSuccess(true);
          setDescription('Submitted!');
          // notification
          setNotificationKind(NOTIFICATION_KINDS.SUCCESS);
          setNotificationTitle('Transaction success');
          setNotificationSubitle('Tokens purchased');
          setNotificationTx(res.transactionHash);
          setIsNotificationOpen(true);
        }
      } catch (error) {
        console.log(error);
        setDescription('Error!');
        // notification
        setNotificationKind(NOTIFICATION_KINDS.ERROR);
        setNotificationTitle('Transaction failed');
        setNotificationSubitle(error.message);
        setNotificationTx(undefined);
        setIsNotificationOpen(true);
      } finally {
        setIsSubmitting(false);
        setTimeout(() => {
          reset();
        }, 5000);
      }
    }
  }

  const reset = () => {
    setSuccess(false);
    setDescription('Submitting...');
    setIsNotificationOpen(false);
  }

  return (
    <React.Fragment>
      <Form onSubmit={onSubmit}>
        <NumberInput
          id='tokenAmount'
          label={'Amount of tokens'}
          min={100}
          max={5000}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          hideSteppers={true}
        />
        {isSubmitting || success ? (
          <InlineLoading
            style={{ marginLeft: '1rem' }}
            description={description}
            status={success ? 'finished' : 'active'}
          />
        ) : (
          <Button type="submit" disabled={!account}>
            Buy
          </Button>
        )}
      </Form>
      {isNotificationOpen && (
        <InlineNotification
          kind={notificationKind}
          title={notificationTitle}
          subtitle={notificationSubitle}
          onCloseButtonClick={() => setIsNotificationOpen(false)}
          actions={
            !!notificationTx && (
              <NotificationActionButton>
                <Link target='_blank' href={`https://testnet.bscscan.com/tx/${notificationTx}`}>View tx</Link>
              </NotificationActionButton>
            )
          }
        />
      )}
    </React.Fragment>
  );
}