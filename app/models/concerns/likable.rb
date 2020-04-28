module Likable
  extend ActiveSupport::Concern

  included do
    has_many :likes, :as => :likable, dependent: :destroy
  end

  def liked_by?(user)
    self.likes.exists?(user_id: user.id)
  end

  def find_like_from(user)
    self.likes.find_by(user_id: user.id)
  end
end