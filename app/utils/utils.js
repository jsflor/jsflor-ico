import web3 from 'web3';
import { InjectedConnector } from '@web3-react/injected-connector';

export const injected = new InjectedConnector({
  supportedChainIds: [97],
});

export function ellipseAddress(address = "", width = 3) {
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}

export function fromWei(value) {
  return web3.utils.fromWei(value);
}

export function toBN(value) {
  return web3.utils.toBN(value);
}

export function fromUnixTimestamp(value) {
  return new Date(value * 1000);
}

export function formatDate(date, locale = 'en', options = {}) {
  return new Intl.DateTimeFormat(locale, options).format(date);
}

export function isEmpty(obj) {
  return Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;
}