import React from 'react';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import Web3 from 'web3';

import Head from 'next/head'
import Layout from '../components/Layout'
import JSFLOR_ICO from '../../build/contracts/JSFLOR_ICO.json';
import { JSFLOR_ICO_ADDRESS } from '../utils/constants';
import '../index.scss'

function getLibrary(provider) {
  return new Web3(provider)
}

function App({ Component, pageProps }) {
  const { library } = useWeb3React();
  const [web3, setWeb3] = React.useState(undefined);
  const [contract, setContract] = React.useState(undefined);

  React.useEffect(() => {
    if (!web3 && !contract && (library?.givenProvider || window?.ethereum)) {
      initWeb3(library?.givenProvider || window?.ethereum);
    }
  }, [library]);

  const initWeb3 = (provider) => {
    const web3 = new Web3(provider);
    const icoContract = new web3.eth.Contract(JSFLOR_ICO.abi, JSFLOR_ICO_ADDRESS);

    setWeb3(web3);
    setContract(icoContract);
  }

  return (
    <Layout>
      <Component {...pageProps} contract={contract} />
    </Layout>
  );
}

export default function MyApp(props) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Head>
        <title>JSFLOR ICO</title>
      </Head>
      <App {...props} />
    </Web3ReactProvider>
  );
}