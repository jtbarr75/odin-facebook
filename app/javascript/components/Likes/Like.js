import React, { Fragment } from 'react'

const Like = (props) => {
  return (
    <Fragment>
    <span className="label label-success">{props.obj.likes.length} likes</span>
    { props.obj.likes.includes(props.currentUser.name) ?
      <button className="btn btn-xs btn-default">Unlike</button> :
      <button className="btn btn-xs btn-default">Like</button>
    }
    </Fragment>
  )
}

export default Like