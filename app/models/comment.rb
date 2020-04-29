class Comment < ApplicationRecord
  include Likable
  include Notifiable
  
  belongs_to :user
  belongs_to :post

  after_create :notify

  validates :body, presence: true
end
