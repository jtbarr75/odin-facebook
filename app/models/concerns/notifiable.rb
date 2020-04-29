module Notifiable
  extend ActiveSupport::Concern

  included do
    has_many :notifications, :as => :notifiable, dependent: :destroy
  end

  def notify(user, message)
    self.notifications.create(user_id: user.id, message: message)
  end

end