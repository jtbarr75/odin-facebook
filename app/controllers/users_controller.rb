class UsersController < ApplicationController
  before_action :require_login, only: :show

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
    @post = @user.posts.build
  end
end
