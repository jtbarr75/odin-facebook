class Comment < ApplicationRecord
  include Likable
  include Notifiable
  
  belongs_to :user
  belongs_to :post

  validates :body, presence: true
end
