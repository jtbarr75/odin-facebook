class Friendship < ApplicationRecord
  belongs_to :user, foreign_key: :user_id, class_name: 'User'
  belongs_to :friend, foreign_key: :friend_id, class_name: 'User'

  after_update :create_inverse

  validates_uniqueness_of :user_id, scope: :friend_id
  validates :status, presence: true, inclusion: { in: %w(active pending) }

  def self.make_friends(user1, user2)
    self.create(user_id: user1.id, friend_id: user2.id, status: 'pending')
  end

  private

    def create_inverse
      unless self.class.exists?(user_id: self.friend_id, friend_id: self.user_id)
        self.class.create(user_id: self.friend_id, friend_id: self.user_id, status: 'active')
      end
    end
end
