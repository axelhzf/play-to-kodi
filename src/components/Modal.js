import React, { PropTypes } from 'react'
import classNames from 'classnames'

export default class Modal extends React.Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func,
    onOk: PropTypes.func
  }

  render () {
    const {onClose, onOk} = this.props

    return (
      <div className={classNames("modal", { open: this.props.open })}>

        <div className="modal-header">
          {onClose && <button className="modal-close" onClick={this.props.onClose}>Back</button> }
          <div className="modal-title">{this.props.title}</div>
          {onOk && <button className="modal-ok" onClick={this.props.onOk}>Ok</button> }
        </div>

        {this.props.children}
      </div>
    )
  }

}