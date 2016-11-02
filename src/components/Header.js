import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import styles from './Header.css'

export default class Header extends React.Component {

  render () {
    return (
      <div className={styles.header}>
        <ul>
          <li><Link to='/movies' activeClassName={styles.active}>Movies</Link></li>
          <li><Link to='/shows' activeClassName={styles.active}>TV Shows</Link></li>
        </ul>
      </div>
    )
  }

}