class CommentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user_id, :post_id, :body
  belongs_to :user
  belongs_to :post
end
