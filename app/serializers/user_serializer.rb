class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :picture
  has_many :posts
end
