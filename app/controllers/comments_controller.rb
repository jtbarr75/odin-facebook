class CommentsController < ApplicationController
  before_action :require_login

  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.build(params.require(:comment).permit(:body))
    @comment.user_id = current_user.id
    if @comment.save
      @comment.notify(@post.user, "#{current_user.name} commented on your post")
      flash[:success] = "Commented!"
      redirect_back(fallback_location: root_url)
    else
      render 'posts/show'
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    flash[:success] = "Comment Deleted"
    redirect_back(fallback_location: root_url)
  end

  def show
    @comment = Comment.find(params[:id])
    redirect_to @comment.post
  end
end
