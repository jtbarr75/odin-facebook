
class PostsController < ApplicationController
  before_action :require_login

  def index
    @posts = current_user.timeline_posts
    @user = current_user
    @post = @user.posts.build
  end

  def show
    @post = Post.find(params[:id])
    @comment = Comment.new
  end

  def create
    @user = User.find(params[:user_id])
    @post = @user.posts.build(params.require(:post).permit(:body, :picture))
    if @post.save
      flash[:success] = "Post Created"
      redirect_to @user
    else
      render 'users/show'
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    flash[:success] = "Post Deleted"
    redirect_to current_user
  end

end
