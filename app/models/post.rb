class Post < ApplicationRecord
  include Likable

  belongs_to :user
  has_many :comments, dependent: :destroy

  scope :desc, -> { order("created_at DESC") }
  mount_uploader :picture, PictureUploader
  validates :user_id, presence: true
  validates :body, presence: true
  validate :picture_size

  def created_at_pst
    self.created_at.in_time_zone("Pacific Time (US & Canada)").strftime("%b %e, %Y %l:%M %p")
  end

  def username
    self.user.name
  end

  def data
    return {
      id: self.id,
      body: self.body,
      picture: self.picture,
      createdAt: self.created_at_pst,
      comments: self.comments.map{|comment| comment.data},
      likes: self.likes,
      user: self.user.post_data
    }
  end

  private

    def picture_size
      if picture.size > 5.megabytes
        errors.add(:picture, "should be less than 5MB")
      end
    end
end
