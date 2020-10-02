module Api
  module V1
    class UsersController < ApplicationController
      before_action :require_login
    
      def index
        @users = User.where("name like ?", "%#{params[:search]}%")
        render json: { users: @users, searched: params[:search]}, status: :ok
      end

    end
  end
end