class CommentsController < ApplicationController
  before_action :require_login

  def show
    @comment = Comment.find(params[:id])
    redirect_to @comment.post
  end
end
