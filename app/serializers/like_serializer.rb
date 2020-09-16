class LikeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user_id, :likable_id, :likable_type
  belongs_to :user
  belongs_to :likable, polymorphic: true
end
