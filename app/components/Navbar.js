import React from 'react';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
  Button,
} from 'carbon-components-react';
import {
  LogoLinkedin20,
  LogoGithub20,
  LogoDiscord20,
} from '@carbon/icons-react';
import { useWeb3React } from '@web3-react/core';

import { injected, ellipseAddress } from '../utils/utils'
import { JSFLOR_ICO_ADDRESS } from '../utils/constants';
import { useMediaQuery } from '../utils/hooks';

export default function Navbar() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { active, account, activate, deactivate } = useWeb3React();

  const connect = async () => {
    try {
      await activate(injected);
    } catch (error) {
      console.log(error);
    }
  }

  const disconnect = () => {
    try {
      deactivate();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <Header aria-label="JSFLOR ICO">
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Open menu"
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <HeaderName href="/" prefix="ICO">
            {!isMobile && 'JSFLOR'}
          </HeaderName>
          <HeaderNavigation aria-label="JSFLOR ICO">
            <HeaderMenuItem target='_blank' href={`https://testnet.bscscan.com/address/${JSFLOR_ICO_ADDRESS}`}>BSC Scan</HeaderMenuItem>
            <HeaderMenuItem target='_blank' href={`https://github.com/jsflor/jsflor-ico`}>Source code</HeaderMenuItem>
            <HeaderMenuItem href={`mailto:jsflor97@gmail.com`}>Contact</HeaderMenuItem>
          </HeaderNavigation>
          <SideNav
            aria-label="Side navigation"
            expanded={isSideNavExpanded}
            isPersistent={false}>
            <SideNavItems>
              <HeaderSideNavItems>
                <HeaderMenuItem target='_blank' href={`https://testnet.bscscan.com/address/${JSFLOR_ICO_ADDRESS}`}>BSC Scan</HeaderMenuItem>
                <HeaderMenuItem target='_blank' href={`https://github.com/jsflor/jsflor-ico`}>Source code</HeaderMenuItem>
                <HeaderMenuItem href={`mailto:jsflor97@gmail.com`}>Contact</HeaderMenuItem>
              </HeaderSideNavItems>
            </SideNavItems>
          </SideNav>
          <HeaderGlobalBar>
            {!isMobile && (
              <>
                <HeaderGlobalAction target='_blank' href={`https://discordapp.com/users/905535526357057546`} aria-label="Discord">
                  <LogoDiscord20 />
                </HeaderGlobalAction>
                <HeaderGlobalAction target='_blank' href={`https://www.linkedin.com/in/juan-sebastian-flor-usma/`} aria-label="Linkedin">
                  <LogoLinkedin20 />
                </HeaderGlobalAction>
                <HeaderGlobalAction target='_blank' href={`https://github.com/jsflor`} aria-label="Github">
                  <LogoGithub20 />
                </HeaderGlobalAction>
              </>
            )}
            {!active && <Button onClick={connect}>Connect Metamask</Button>}
            {active && account && <Button kind="secondary" onClick={disconnect}>Disconnect {ellipseAddress(account)}</Button>}
          </HeaderGlobalBar>
        </Header>
      )}
    />
  );
}