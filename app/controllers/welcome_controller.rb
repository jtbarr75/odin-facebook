class WelcomeController < ApplicationController
  before_action :authenticate_user!, only: [:app]
  
  def home

  end

  def app 
    signed_in = user_signed_in?
    @currentUser = {
      name: current_user.name,
      id: current_user.id,
      notifications: current_user.notifications,
      signedIn: signed_in
    }
    @posts = Post.all
    @post  = current_user.posts.build(body: "")
  end

end
