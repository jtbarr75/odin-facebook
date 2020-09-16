class PostSerializer
  include FastJsonapi::ObjectSerializer
  attributes :body, :user_id, :picture, :created_at_pst, :username
  belongs_to :user
  has_many :likes
  has_many :comments
end
