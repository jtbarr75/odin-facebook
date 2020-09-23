module Api
  module V1
    class LikesController < ApplicationController

      def create
        @parent = Post.find(params[:post_id]) if params[:post_id]
        @parent ||= Comment.find(params[:comment_id]) if params[:comment_id]
        @like = @parent.likes.build(user_id: current_user.id)
        if @like.save
          @like.notify(@parent.user, "#{current_user.name} liked your #{@parent.class.name.downcase}") #unless @parent.user == current_user
          render json: {message: "success", likable: @parent}, status: :ok
        else
          render json: { error: 'like error' }, status: :unprocessable_entity
        end
      end

      def destroy
        @like = Like.find(params[:id])
        @like.destroy
        redirect_back(fallback_location: root_path)
      end

      def show
        @like = Like.find(params[:id])
        redirect_to @like.likable
      end
    end
  end 
end