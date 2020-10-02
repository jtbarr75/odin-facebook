module Api
  module V1
    class FriendshipsController < ApplicationController
      before_action :require_login
    
      def index
        @user = User.find(params[:user_id])
        @friend_requests = @user.friend_requests.includes(:friend)
        @friendships = @user.active_friendships.includes(:friend)
      end
    
      def create
        @user = User.find(params[:user_id])
        @friendship = Friendship.new(user_id: @user.id, friend_id: current_user.id, status: 'pending')
        if @friendship.save
          @friendship.notify(@friendship.user, "#{current_user.name} sent you a friend request")
          render json: {message: "friend request sent", user: @user.data }, status: :ok
        else
          render json: {message: "friend request failed"}, status: 422
        end
      end
    
      def update
        @friendship = Friendship.find(params[:id])
        @friendship.status = "active"
        @user = User.find(@friendship.friend_id)
        if @friendship.save
          @friendship.notify(@friendship.friend, "#{current_user.name} accepted your friend request")
          render json: {message: "friend request accepted", user: @user.data }, status: :ok
        else
          render json: {message: "friend acceptance failed"}, status: 422
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
    
  end
end