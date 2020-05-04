class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  private

    def require_login
      unless user_signed_in? 
        flash[:danger] = "Please sign in"
        redirect_to new_user_session_path
      end
    end

  protected

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :picture])
      devise_parameter_sanitizer.permit(:account_update, keys: [:name, :picture])
    end

end
