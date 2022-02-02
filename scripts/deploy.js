const path = require('path');
const fs = require('fs');

const dotenv = require('dotenv');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const { abi, evm } = require('./compile');

const appEnvPath = path.resolve(__dirname, '..', 'app', '.env');
const appAbiPath = path.resolve(__dirname, '..', 'app', 'ICO_ABI.JSON');
const result = dotenv.config();

if (result.error) {
  throw result.error;
}

/**
 * BLOCKCHAIN TESTNET NODE
 */
const RINKEBY_NODE = `https://rinkeby.infura.io/v3/${process.env.RINKEBY_API_KEY}`;
/**
 * PROVIDER
 */
const provider = new HDWalletProvider({ mnemonic: process.env.PRIVATE_KEY, providerOrUrl: RINKEBY_NODE });
/**
 * WEB 3
 */
const web3 = new Web3(provider);

(async () => {
  /**
   * accounts: [0xcF01971DB0CAB2CBeE4A8C21BB7638aC1FA1c38c, 0x111...., 0x222..]
   */
  const accounts = await web3.eth.getAccounts();

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: [process.env.DEPOSIT_ACCOUNT] })
    .send({ gas: '1000000', from: accounts[0] });

  console.log(`contract deployed to ${result.options.address}`);

  const content = `ICO_ADDRESS=${result.options.address}`;

  try {
    fs.writeFileSync(appEnvPath, content)
    fs.writeFileSync(appAbiPath, JSON.stringify(abi))
  } catch (error) {
    console.error(error);
  }

  // prevent hanging development
  provider.engine.stop();
})();