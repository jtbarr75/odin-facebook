class FriendshipsController < ApplicationController
  before_action :require_login

  def index
    @user = User.find(params[:user_id])
  end

  def create
    @friendship = Friendship.new(user_id: params[:user_id], friend_id: current_user.id, status: 'pending')
    if @friendship.save
      @friendship.notify(@friendship.user, "#{current_user.name} sent you a friend request")
      flash[:success] = "Friend Request sent!"
      redirect_back(fallback_location: root_path)
    else
      flash[:danger] = "Could not add friend."
      redirect_back(fallback_location: root_path)
    end
  end

  def update
    @friendship = Friendship.find(params[:id])
    @friendship.status = params[:status]
    if @friendship.save
      @friendship.notify(@friendship.friend, "#{current_user.name} accepted your friend request")
      flash[:success] = "Friend Request accepted!"
      redirect_back(fallback_location: root_path)
    else
      flash[:danger] = "Something unexpected prevented you from accepting this request."
      redirect_back(fallback_location: root_path)
    end
  end

  def destroy
    @friendship = Friendship.find(params[:id])
    @friendship.destroy
    flash[:success] = params[:message]
    redirect_back(fallback_location: root_path)
  end

  def show
    redirect_to user_friendships_path(current_user)
  end
end
