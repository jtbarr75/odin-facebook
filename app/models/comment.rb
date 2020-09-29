class Comment < ApplicationRecord
  include Likable
  include Notifiable
  
  belongs_to :user
  belongs_to :post
  mount_uploader :picture, PictureUploader

  validates :body, presence: true

  scope :desc, -> { order("created_at DESC") }

  def data
    return {
      id: self.id,
      body: self.body,
      created_at: created_at_pst,
      user: {
        id: self.user_id,
        name: self.user.name
      },
      picture: self.picture,
      likes: self.likes
    }
  end

  def created_at_pst
    self.created_at.in_time_zone("Pacific Time (US & Canada)").strftime("%b %e, %Y %l:%M %p")
  end
end
