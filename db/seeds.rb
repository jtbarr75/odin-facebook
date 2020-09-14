User.create!(name:  "Jason Barr",
  email: "barr75@gmail.com",
  password:              "password",
  password_confirmation: "password"
)

10.times do |n|
  name  = Faker::Name.name
  email = "example-#{n+1}@example.com"
  password = "password"
  User.create!(name:  name,
               email: email,z 
               password:              password,
               password_confirmation: password)
end

users = User.order(:created_at).take(6)
10.times do
  content = Faker::Company.bs + " and " + Faker::Company.bs
  users.each { |user| user.posts.create!(body: content) }
end