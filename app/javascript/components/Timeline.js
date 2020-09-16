import React from 'react'
import Errors from './Errors'
import Like from './Likes/Like'
import axios from 'axios'

class Timeline extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      post: {body: ""}
    }
    this.handlePostChange = this.handlePostChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }

  componentDidMount() {
    const url = "/api/v1/posts.json" //need to set up api to give the right posts
    axios.get(url)
      .then(response => {
        console.log(response)
        this.setState({  
          posts: response.data.data
        });
        
      })
      .catch(error => console.log(error))
  }

  handlePostChange(event) {
    const { post } = { ...this.state };
    const currentPost = post;
    const { name, value } = event.target;
    currentPost[name] = value;
    this.setState({ post: currentPost});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.fileInput.current.files[0]
    console.log("some code is going to post this")
  }

  render() {
    const { posts, post } = this.state;
    
    let postsList;
    if (posts) {
      postsList = posts.map((post, index) => {
        console.log(post)
        return (
          <div key={index} className="well col-xs-8">
            <div className="content">
              <p>{post.attributes.body}</p>
              { post.attributes.picture && <img src={post.attributes.picture}/> }
            </div>
            <a href="#">{post.attributes.username} posted: {post.attributes.created_at_pst}</a>
            <a href="#">{post.relationships.comments.data.count} comments</a>
            {this.props.currentUser.id == post.attributes.user_id && 
              <button className="btn btn-default btn-xs" >Delete</button>
            }
            <Like currentUser={this.props.currentUser} obj={post} />
          </div>
        )
      })
    }
    
    return (
      <div className="row">
        <div className="well col-xs-8">
          {/* <Errors obj={post} /> */}
          <form className="form" onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <input type="textarea" name="body" className="form-control" value={post.body} onChange={this.handlePostChange} rows="2"/>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-large" >Submit</button>
            </div>
            <span className="picture">
              <label name="picture" >Upload a photo</label>
              <input type="file"  accept="image/gif, image/jpeg, image/png" name="picture" id="post-picture" ref={this.fileInput}/>
            </span>
          </form>
        </div>
        {postsList}
      </div>
    )
  }
}

export default Timeline