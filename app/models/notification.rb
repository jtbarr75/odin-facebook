class Notification < ApplicationRecord
  belongs_to :notifiable, polymorphic: true
  belongs_to :user

  validates :message, presence: true

  scope :desc, -> { order("created_at DESC") }
end
