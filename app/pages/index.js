import React from 'react';
import web3 from 'web3';
import { Tab, Tabs, Link, StructuredListWrapper, StructuredListBody, StructuredListRow, StructuredListCell } from 'carbon-components-react';
import { useWeb3React } from '@web3-react/core';

import Invest from '../modules/Invest';
import Balance from '../modules/Balance';

function HomePage({ contract }) {
  const { account } = useWeb3React();
  console.log(contract);

  const [ico, setIco] = React.useState(undefined);

  React.useEffect(() => {
    if (contract) {
      getData();
    }
  }, [contract, account]);

  const getData = async () => {
    const tokenPrice = await contract.methods.tokenPrice().call();
    const minInvestment = await contract.methods.minInvestment().call();
    const maxInvestment = await contract.methods.maxInvestment().call();
    const totalSupply = await contract.methods.totalSupply().call();
    const raisedAmount = await contract.methods.raisedAmount().call();
    const saleStart = await contract.methods.saleStart().call();
    const saleEnd = await contract.methods.saleEnd().call();
    const tokenTradeStart = await contract.methods.tokenTradeStart().call();
    // const admin = await contract.methods.admin().call();
    // console.log(`admin: ${admin}`);
    setIco({
      tokenPrice: web3.utils.fromWei(tokenPrice),
      minInvestment: web3.utils.fromWei(minInvestment),
      maxInvestment: web3.utils.fromWei(maxInvestment),
      totalSupply,
      raisedAmount: web3.utils.fromWei(raisedAmount),
      saleStart: new Date(saleStart * 1000),
      saleEnd: new Date(saleEnd * 1000),
      tokenTradeStart: new Date(tokenTradeStart * 1000),
    })
  }

  const formatDate = (date, locale = 'en', options = {}) => new Intl.DateTimeFormat(locale, options).format(date);

  return (
    <div className="bx--grid">
      <div className="bx--row">
        <section className="bx--col-lg-12">
          <h2
            style={{
              fontWeight: "800",
              marginBottom: "30px",
              fontSize: "20px"
            }}
          >
            JSFLOR token ICO
          </h2>
          <p style={{ lineHeight: "20px" }}>
            Initial Coin Offering for JSFLOR token. A fully <Link target='_blank' href='https://ethereum.org/en/developers/docs/standards/tokens/erc-20/'>ERC20</Link> compliant token contract written in solidity and delopyed to Binance Smart Chain testnet for educational purposes.
          </p>
          {!!ico && Object.keys(ico).length > 0 && (
            <div style={{ margin: '30px 0' }}>
              <StructuredListWrapper>
                <StructuredListBody>
                  {/* TOKEN PRICE */}
                  <StructuredListRow>
                    <StructuredListCell noWrap>Price</StructuredListCell>
                    <StructuredListCell>The token price is {ico.tokenPrice} ether</StructuredListCell>
                  </StructuredListRow>
                  {/* MIN INVESTMENT */}
                  <StructuredListRow>
                    <StructuredListCell noWrap>Min. investment</StructuredListCell>
                    <StructuredListCell>Minimum investment is {ico.minInvestment} ether, 100 tokens</StructuredListCell>
                  </StructuredListRow>
                  {/* MAX INVESTMENT */}
                  <StructuredListRow>
                    <StructuredListCell noWrap>Max. investment</StructuredListCell>
                    <StructuredListCell>Maximum investment is {ico.maxInvestment} ether, 5000 tokens</StructuredListCell>
                  </StructuredListRow>
                  {/* TOTAL SUPPLY */}
                  <StructuredListRow>
                    <StructuredListCell noWrap>Total supply</StructuredListCell>
                    <StructuredListCell>Total supply of tokens is {ico.totalSupply}</StructuredListCell>
                  </StructuredListRow>
                  {/* RAISED AMOUNT */}
                  <StructuredListRow>
                    <StructuredListCell noWrap>Raised amount</StructuredListCell>
                    <StructuredListCell>The raised amount at the moment is {ico.raisedAmount} ether</StructuredListCell>
                  </StructuredListRow>
                  {/* SALE START */}
                  <StructuredListRow>
                    <StructuredListCell noWrap>Sale start</StructuredListCell>
                    <StructuredListCell>ICO sale starts at {formatDate(ico.saleStart, 'en', { dateStyle: 'long' })}</StructuredListCell>
                  </StructuredListRow>
                  {/* SALE END */}
                  <StructuredListRow>
                    <StructuredListCell noWrap>Sale end</StructuredListCell>
                    <StructuredListCell>ICO sale ends at {formatDate(ico.saleEnd, 'en', { dateStyle: 'long' })}</StructuredListCell>
                  </StructuredListRow>
                  {/* TOKEN TRADE START */}
                  <StructuredListRow>
                    <StructuredListCell noWrap>Token trade start</StructuredListCell>
                    <StructuredListCell>Token is locked until {formatDate(ico.tokenTradeStart, 'en', { dateStyle: 'long' })}</StructuredListCell>
                  </StructuredListRow>
                </StructuredListBody>
              </StructuredListWrapper>
            </div>
          )}
          <Tabs>
            <Tab id="tab-1" label="Invest">
              <Invest contract={contract} />
            </Tab>
            <Tab id="tab-2" label="Balance">
              <Balance contract={contract} />
            </Tab>
          </Tabs>
        </section>
      </div>
    </div>
  );
}

export default HomePage