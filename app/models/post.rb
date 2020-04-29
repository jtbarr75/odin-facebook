class Post < ApplicationRecord
  include Likable

  belongs_to :user
  has_many :comments, dependent: :destroy

  validates :user_id, presence: true
  validates :body, presence: true

  scope :desc, -> { order("created_at DESC") }
end
