module Api
  module V1
    class PostsController < ApplicationController
      # before_action :require_login
    
      def index
        posts = current_user.timeline_posts
        # @post = @user.posts.build
        if user_signed_in?
          render json: PostSerializer.new(posts).serialized_json
        else
          render json: {}, status: 401
        end
      end
    
      def show
        @post = Post.find(params[:id])
        @comment = Comment.new
      end
    
      def create
        @user = User.find(params[:user_id])
        @post = @user.posts.build(params.require(:post).permit(:body, :picture))
        if @post.save
          flash[:success] = "Post Created"
          redirect_to @user
        else
          render 'users/show'
        end
      end
    
      def destroy
        @post = Post.find(params[:id])
        @post.destroy
        flash[:success] = "Post Deleted"
        redirect_to current_user
      end
    
    end
  end
end

