import React, { PropTypes } from 'react'
import Header from '../components/Header'
import styles from './App.css'

export default class App extends React.Component {

  render () {
    return (
      <div>
        <Header/>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }

}