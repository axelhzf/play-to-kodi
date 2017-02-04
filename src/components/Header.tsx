import * as React from 'react';
import styled from 'styled-components';
import Link from '../components/Link';
import { GatewayDest } from 'react-gateway';
import { AppBar, Navigation } from 'react-toolbox'
import * as colors from '../styles/colors';
import * as variables from '../styles/variables';
import { GatewayDest } from 'react-gateway';

export default class Header extends React.Component<null, null> {

  render () {
    return (
      <AppBar title="Play-to-kodi" fixed>
        <nav>
          <HeaderGateway name="header"/>
          <HeaderLink to='/movies'>Movies</HeaderLink>
          <HeaderLink to='/shows'>TV Shows</HeaderLink>
        </nav>
      </AppBar>
    )
  }

}

const HeaderLink = styled(Link)`
  padding: 0 10px;
  text-decoration: none;
  line-height: ${variables.headerHeight};
  display: inline-block;

  &.active {
    box-shadow: inset 0 -3px 0 0 ${colors.primary};
  }
`

const HeaderGateway = styled(GatewayDest)`
  display: inline-block;
`