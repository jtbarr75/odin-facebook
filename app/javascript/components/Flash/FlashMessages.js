import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'
import Alert from './Alert'

class FlashMessages extends React.Component {

  constructor(props) {
    super(props);
    this.state = { messages: props.messages };
    
    window.flash_messages = this;
    this.addMessage = this.addMessage.bind(this)
    this.removeMessage = this.removeMessage.bind(this)
  }

  addMessage(message) {
    const messages = [...this.state.messages, message]
    this.setState({ messages: messages });
  }

  removeMessage(message) {
    const index = this.state.messages.indexOf(message);
    const messages = [...this.state.messages]
    messages.splice(index, 1)
    this.setState({ messages: messages });
  }

  render () {
    const alerts = this.state.messages.map( message =>
      <Alert key={ message.id } message={ message }
        onClose={ () => this.removeMessage(message) } />
    );
    
    return(
      <Fragment>{ alerts }</Fragment> 
    );
  }
}

FlashMessages.propTypes = {
  messages: PropTypes.array.isRequired
};

export default FlashMessages