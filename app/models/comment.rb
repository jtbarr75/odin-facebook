class Comment < ApplicationRecord
  include Likable
  
  belongs_to :user
  belongs_to :post

  validates :body, presence: true
end
