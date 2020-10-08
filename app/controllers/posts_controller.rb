
class PostsController < ApplicationController
  before_action :require_login

  def show
    @post = Post.find(params[:id]).data
  end

end
