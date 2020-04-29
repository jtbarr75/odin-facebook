class Comment < ApplicationRecord
  include Likable
  include Notifiable
  
  belongs_to :user
  belongs_to :post

  validates :body, presence: true

  scope :desc, -> { order("created_at DESC") }
end
