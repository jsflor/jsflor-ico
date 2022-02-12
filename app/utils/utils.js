import { InjectedConnector } from '@web3-react/injected-connector';

export const injected = new InjectedConnector({
  supportedChainIds: [97],
});

export function ellipseAddress(address = "", width = 3) {
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}