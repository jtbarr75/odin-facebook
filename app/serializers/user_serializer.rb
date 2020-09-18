class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :picture, :id
  has_many :posts
end
