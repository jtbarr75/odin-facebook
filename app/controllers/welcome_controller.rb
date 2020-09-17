class WelcomeController < ApplicationController
  before_action :authenticate_user!, only: [:app]
  
  def home

  end

  def app 
    @currentUser = {
      name: current_user.name,
      id: current_user.id,
      notifications: current_user.notifications,
    }
  end

end
