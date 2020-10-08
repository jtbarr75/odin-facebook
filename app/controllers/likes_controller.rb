class LikesController < ApplicationController

  def show
    @like = Like.find(params[:id])
    redirect_to @like.likable
  end
end
