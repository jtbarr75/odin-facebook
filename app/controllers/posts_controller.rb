class PostsController < ApplicationController

  def create
    @user = User.find(params[:user_id])
    @post = @user.posts.build(params.require(:post).permit(:body))
    if @post.save
      flash[:success] = "Post Created"
      redirect_to @user
    else
      redirect_to @user
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    flash[:success] = "Post Deleted"
    redirect_to root_path
  end

end
