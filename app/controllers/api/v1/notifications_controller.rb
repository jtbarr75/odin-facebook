module Api
  module V1
    class NotificationsController < ApplicationController

      def update
        @notification = Notification.find(params[:id])
        @notification.update_attributes(unread: false)
        @parent = @notification.notifiable
        
        if @notification.notifiable_type == "Like"
          if @parent.likable_type == "Post"
            render json: @parent.likable, status: :ok
          elsif @parent.likable_type == "Comment"
            render json: @parent.likable.post, status: :ok
          end
        elsif @notification.notifiable_type == "Comment"
          render json: @notification.notifiable.post, status: :ok
        end
      end
    end

  end
end