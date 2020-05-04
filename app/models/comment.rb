class Comment < ApplicationRecord
  include Likable
  include Notifiable
  
  belongs_to :user
  belongs_to :post
  mount_uploader :picture, PictureUploader

  validates :body, presence: true

  scope :desc, -> { order("created_at DESC") }

  def created_at_pst
    self.created_at.in_time_zone("Pacific Time (US & Canada)")
  end
end
