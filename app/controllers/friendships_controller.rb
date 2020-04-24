class FriendshipsController < ApplicationController

  def create
    @friendship = Friendship.new(user_id: current_user.id, friend_id: params[:user_id], status: 'pending')
    if @friendship.save
      flash[:success] = "Friend Request sent!"
      redirect_back(fallback_location: root_path)
    else
      flash[:danger] = "Could not add friend."
      redirect_back(fallback_location: root_path)
    end
  end

  def update
    @friendship = Friendship.find_by(user_id: current_user.id, friend_id: params[:user_id])
    @friendship.status = 'active'
    if @friendship.save
      flash[:success] = "Friend Request accepted!"
      redirect_back(fallback_location: root_path)
    else
      flash[:danger] = "Something unexpected prevented you from accepting this request."
      redirect_back(fallback_location: root_path)
    end
  end

  def destroy
  end
end
