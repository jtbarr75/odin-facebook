module Api
  module V1
    class NotificationsController < ApplicationController

      def update
        @notification = Notification.find(params[:id])
        @notification.update_attributes(unread: false)
        @parent = @notification.notifiable
        
        if @notification.notifiable_type == "Like"
          if @parent.likable_type == "Post"
            render json: { parent: @parent.likable, notification: @notification}, status: :ok
          elsif @parent.likable_type == "Comment"
            render json: { parent: @parent.likable.post, notification: @notification}, status: :ok
          end
        elsif @notification.notifiable_type == "Comment"
          render json: { parent: @notification.notifiable.post, notification: @notification}, status: :ok
        end
      end
    end

  end
end