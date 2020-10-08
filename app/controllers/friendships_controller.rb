class FriendshipsController < ApplicationController
  before_action :require_login

  def index
    @user = User.find(params[:user_id])
  end

end
