class PostsController < ApplicationController
  before_action :require_login

  def create
    @user = User.find(params[:user_id])
    @post = @user.posts.build(params.require(:post).permit(:body))
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
