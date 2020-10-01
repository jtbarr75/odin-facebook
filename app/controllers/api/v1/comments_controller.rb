module Api
  module V1
    class CommentsController < ApplicationController
      before_action :require_login

      def index
        @post = Post.find(params[:post_id])
        @comments = @post.comments_data
        render json: @comments, status: :ok
      end
    
      def create
        @post = Post.find(params[:post_id])
        @comment = @post.comments.build(params.require(:comment).permit(:body, :picture))
        @comment.user_id = current_user.id
        if @comment.save
          @comment.notify(@post.user, "#{current_user.name} commented on your post") #unless @post.user == current_user
          render json: {success: "commented successfully", post: @post.data}, status: :ok
        else
          render json: {error: "couldnt comment"}, status: :unprocessable_entity
        end
      end
    
      def destroy
        @comment = Comment.find(params[:id])
        @parent = @comment.post
        if @comment.destroy
          @comments = @parent.comments_data
          render json: { message: "deleted comment", post: @parent.data, comments: @comments }, status: :ok
        else
          render json: { message: "failed to delete comment"}, status: 422
        end
      end

      def update
        @comment = Comment.find(params[:id])
        @parent = @comment.post
        if @comment.update(body: params[:body])
          @comments = @parent.comments_data
          render json: { message: "edited comment", post: @parent.data, comments: @comments }, status: :ok
        else
          render json: { message: "failed to edit comment"}, status: 422
        end
      end
    
      def show
        @comment = Comment.find(params[:id])
        redirect_to @comment.post
      end
    end
    
  end
end
