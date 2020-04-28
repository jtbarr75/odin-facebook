class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :name, presence: true, length: { maximum: 30 }

  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :friendships, foreign_key: :user_id, class_name: 'Friendship'
  has_many :friends, through: :friendships
  has_many :likes

  #returns true if friendship is active with given user
  def friends_with(user)
    self.friends.exists?(user.id) && self.friendships.find_by(friend_id: user.id).status == 'active'
  end

  #returns true if friendship is pending with given user
  def requested_by(user)
    self.friends.exists?(user.id) && self.friendships.find_by(friend_id: user.id).status == 'pending'
  end

  #returns pending friendships
  def friend_requests
    self.friendships.where(status: 'pending')
  end

  #returns collection of active friends
  def active_friends
    self.class.where(id: (self.active_friendships.select('friend_id') ) )
  end

  #returns active friendships
  def active_friendships
    self.friendships.where(status: 'active')
  end

  #returns number of active friends
  def friends_count
    self.active_friendships.count
  end
end
