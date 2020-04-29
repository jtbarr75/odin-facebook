class NotificationsController < ApplicationController

  def update
    @notification = Notification.find(params[:id])
    @notification.update_attributes(unread: false)
    redirect_to polymorphic_path(@notification.notifiable)
  end
end
