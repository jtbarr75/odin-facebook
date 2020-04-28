class LikesController < ApplicationController

  def create
    @parent = Post.find(params[:post_id]) if params[:post_id]
    @parent ||= Comment.find(params[:comment_id]) if params[:comment_id]
    @like = @parent.likes.build(user_id: current_user.id)
    if @like.save
      redirect_back(fallback_location: root_path)
    else
      flash[:danger] = "Could not like the post"
      redirect_to @parent
    end
  end

  def destroy
    @like = Like.find(params[:id])
    @like.destroy
    redirect_back(fallback_location: root_path)
  end
end
