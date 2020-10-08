module Api
  module V1
    class UsersController < ApplicationController
      before_action :require_login
    
      def index
        if (params[:inFriends])
          @users = current_user.friends.where("name like ?", "%#{params[:search]}%")
        else 
          @users = User.where("name like ?", "%#{params[:search]}%")
        end
        render json: { users: @users, searched: params[:search]}, status: :ok
      end

    end
  end
end