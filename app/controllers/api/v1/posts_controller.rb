module Api
  module V1
    class PostsController < ApplicationController
      before_action :require_login
    
      def index
        posts = current_user.timeline_posts
        if user_signed_in?
          render json: posts
        else
          render json: {}, status: 401
        end
      end
    
      def show
        @post = Post.find(params[:id])
        @comment = Comment.new
      end
    
      def create
        @post = current_user.posts.build(post_params)
        if @post.save
          flash[:success] = "Post Created"
          render json: {post: @post.data, message: "successfully posted"}, status: :ok
        else
          render json: {}, status: 422
        end
      end

      def update
        @post = Post.find(params[:id])
        if @post.update(body: params[:body], picture: params[:picture])
          render json: {message: "successfully updated post", post: @post.data}, status: :ok
        else
          render json: {message: "failed to update post", params: params}, status: 422
        end
      end
    
      def destroy
        @post = Post.find(params[:id])
        @post.destroy
        flash.now[:success] = "Post Deleted"
        render json: { post: @post, message: "deleted post" }
      end

      private

        def post_params
          params.require(:post).permit(:body, :picture)
        end
    
    end
  end
end

