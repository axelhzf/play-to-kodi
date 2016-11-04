import React, {PropTypes} from 'react'
import Link from '../components/Link'

export default class Header extends React.Component {

  render () {
    return (
      <div className="header">
        <ul>
          <li><Link to='/movies'>Movies</Link></li>
          <li><Link to='/shows'>TV Shows</Link></li>
        </ul>
      </div>
    )
  }

}