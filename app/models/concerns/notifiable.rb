module Notifiable
  extend ActiveSupport::Concern

  included do
    has_many :notifications, :as => :notifiable, dependent: :destroy
  end

  def notify
    notification = self.notifications.build
    if self.instance_of? Like
      notification.user_id = self.likable.user.id
      notification.message = "#{self.user.name} liked your post"
    elsif self.instance_of? Comment
      notification.user_id = self.post.user.id
      notification.message = "#{self.user.name} commented on your post"
    elsif self.instance_of? Friendship
      notification.user_id = self.user_id
      notification.message = "#{self.friend.name} sent you a friend request"
    end
    notification.save
  end

end