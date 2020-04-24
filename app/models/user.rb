class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :name, presence: true, length: { maximum: 30 }

  has_many :posts, dependent: :destroy
  has_many :friendships, foreign_key: :user_id, class_name: 'Friendship'
  has_many :friends, through: :friendships

  def friends_with(user)
    self.friends.exists?(user.id) && self.friendships.find_by(friend_id: user.id).status == 'active'
  end

  def request_sent_to(user)
    self.friends.exists?(user.id) && self.friendships.find_by(friend_id: user.id).status == 'pending'
  end
end
