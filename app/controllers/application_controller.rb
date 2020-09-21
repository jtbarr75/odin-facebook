class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :set_current_user

  private

    def set_current_user
      return @currentUser if @currentUser
      @currentUser = {}
      if user_signed_in?
        @currentUser = {
          name: current_user.name,
          id: current_user.id,
          notifications: current_user.notifications,
          signedIn: user_signed_in?
        }
      end
    end

    def require_login
      unless user_signed_in? 
        flash[:danger] = "Please sign in"
        redirect_to login_path
      end
    end

  protected

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :picture])
      devise_parameter_sanitizer.permit(:account_update, keys: [:name, :picture])
    end

end
