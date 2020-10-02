module Api
  module V1
    class LikesController < ApplicationController

      def create
        @parent = Post.find(params[:post_id]) if params[:post_id]
        @parent ||= Comment.find(params[:comment_id]) if params[:comment_id]
        @like = @parent.likes.build(user_id: current_user.id)
        if @like.save
          @like.notify(@parent.user, "#{current_user.name} liked your #{@parent.class.name.downcase}") #unless @parent.user == current_user
          if @parent.is_a? Post 
            render json: {message: "post liked", likable: @parent.data}, status: :ok
          elsif @parent.is_a? Comment
            render json: {message: "comment liked", likable: @parent.post.comments_data}, status: :ok
          end
        else
          render json: { error: 'like error' }, status: :unprocessable_entity
        end
      end

      def destroy
        @like = Like.find(params[:id])
        @parent = @like.likable
        if @like.destroy
          if @parent.is_a? Post 
            render :json=> { success: 'post unliked', likable: @parent.data }, status: :ok
          elsif @parent.is_a? Comment
            render json: {message: "comment unliked", likable: @parent.post.comments_data}, status: :ok
          end
        else
          render :json=> { error: 'unlike failed' }, status: :unprocessable_entity
        end
      end

      def show
        @like = Like.find(params[:id])
        redirect_to @like.likable
      end
    end
  end 
end