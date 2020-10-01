import React from 'react'
import PropTypes from 'prop-types'

class Alert extends React.Component {

  componentDidMount() {
    this.timer = setTimeout(
      this.props.onClose,
      this.props.timeout
    );
  }
  
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  
  alertClass (type) {
    let classes = {
      danger: 'alert-danger',
      warning: 'alert-warning',
      info: 'alert-info',
      success: 'alert-success'
    };
    return classes[type] || classes.success;
  }
  
  render() {
    const message = this.props.message;
    const alertClassName = `alert ${ this.alertClass(message.type) } m-0`;
 
    return(
      <div id={`alert-${message.id}`} className={ alertClassName }>
        <button className='close'
          onClick={ this.props.onClose }>
          &times;
        </button>
        { message.text }
      </div>
    );
  }
}

Alert.propTypes = {
  onClose: PropTypes.func,
  timeout: PropTypes.number,
  message: PropTypes.object.isRequired
};

Alert.defaultProps = {
  timeout: 3000
};

export default Alert