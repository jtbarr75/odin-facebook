class Friendship < ApplicationRecord
  include Notifiable

  belongs_to :user, foreign_key: :user_id, class_name: 'User'
  belongs_to :friend, foreign_key: :friend_id, class_name: 'User'

  after_update :create_inverse
  after_destroy :destroy_inverse

  validates_uniqueness_of :user_id, scope: :friend_id
  validates :status, presence: true, inclusion: { in: %w(active pending) }

  private

    #returns hash with inverse user id and friend id
    def inverse_ids
      { user_id: self.friend_id, friend_id: self.user_id, status: 'active' }
    end

    #creates the inverse friendship so if user1.friends includes user2, user2.friends will have user1
    def create_inverse
      unless self.class.exists?(inverse_ids)
        self.class.create(inverse_ids)
      end
    end

    #destroy inverse friendship when unfriending
    def destroy_inverse
      if self.class.exists?(inverse_ids)
        self.class.where(inverse_ids).destroy_all
      end
    end
end
