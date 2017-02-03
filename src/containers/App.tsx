import * as React from 'react'
import Header from '../components/Header'
import styled from 'styled-components';
import * as variables from '../styles/variables';

interface AppProps {
  children: React.ReactChild
}

export default class App extends React.Component<null, null> {

  render () {
    return (
      <div>
        <Header/>
        <Content>{this.props.children}</Content>
      </div>
    )
  }

}

const Content = styled.div`
  margin-top: ${variables.headerHeight};
`
