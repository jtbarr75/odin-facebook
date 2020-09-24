module Api
  module V1
    class CommentsController < ApplicationController
      before_action :require_login
    
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
        @comment.destroy
        flash[:success] = "Comment Deleted"
        redirect_back(fallback_location: root_url)
      end
    
      def show
        @comment = Comment.find(params[:id])
        redirect_to @comment.post
      end
    end
    
  end
end
