import React from "react"
import PropTypes from "prop-types"

class Errors extends React.Component {
  constructor(props) {
    super(props)

  }

  render () {
    const {obj} = this.props;
    let errors = <></>;
    if (obj.errors) {
      return (
        <div className="row">
          <div className="col-xs-8 col-xs-offset-2">
          <div className="panel panel-danger">
            <div className="panel-heading">
            <h2 className="panel-title">
              The following prohibited this form from submitting:
            </h2>
            <div className="panel-body">
              <ul>
              {obj.errors.full_messages.map(msg => {
                <li>{msg}</li>
              })}
              </ul>
            </div>
            </div>
          </div>
          </div>
        </div>
      )
    }
    return null
  }
}

export default Errors
