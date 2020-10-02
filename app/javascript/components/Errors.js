import React from "react"
import PropTypes from "prop-types"

class Errors extends React.Component {
  constructor(props) {
    super(props)

  }

  render () {
    const {errors} = this.props;
    if (errors) {
      return (
        <div class="card-text">
        </div>
      )
    }
    return null
  }
}

export default Errors
