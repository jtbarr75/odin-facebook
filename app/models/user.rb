class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  mount_uploader :picture, PictureUploader
  validates :name, presence: true, length: { maximum: 30 }

  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :friendships, foreign_key: :user_id, class_name: 'Friendship'
  has_many :friends, through: :friendships
  has_many :likes
  has_many :notifications

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

  #returns timeline of posts from self and all friends
  def timeline_posts
    Post.joins(:user)
      .where( users: { id: self.active_friends.select(:id) })
      .or(Post.joins(:user).where(users: { id: self.id }))
      .includes(:comments, :likes, :user)
      .order('posts.created_at DESC')
      .map { |post| post.data } 
  end

  def posts_data
    Post.joins(:user)
      .where( users: { id: self.id })
      .includes(:comments, :likes, :user)
      .order('posts.created_at DESC')
      .map { |post| post.data } 
  end

  #information for posts or comments
  def post_data
    return {
      id: self.id,
      name: self.name
    }
  end

  def data
    return {
      id: self.id,
      name: self.name,
      posts: self.posts_data,
      friends: self.friends
    }
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      user.name = auth.info.name
      user.picture = auth.info.image
    end
  end

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
        user.email = data["email"] if user.email.blank?
      end
    end
  end
end
