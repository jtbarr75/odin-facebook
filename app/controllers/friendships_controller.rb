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
  end

  def destroy
  end
end
