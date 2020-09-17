class WelcomeController < ApplicationController
  # before_action :authenticate_user!, only: [:app]
  
  def app
    @currentUser = {}
    @signedIn = user_signed_in?
    if user_signed_in?
      @currentUser = {
        name: current_user.name,
        id: current_user.id,
        notifications: current_user.notifications,
      }
    end
  end

end
