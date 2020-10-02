
class RegistrationsController < Devise::RegistrationsController

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in :user, @user
      user_info = {
        id: @user.id,
        name: @user.name,
        notifications: @user.notifications,
        signedIn: user_signed_in?
      }
      render json: user_info
    else
      warden.custom_failure!
      render json: { error: 'signup error' }, status: :unprocessable_entity
    end
  end

  def update
    super
  end

  def destroy
    @user = User.find_by_email(user_params[:email])
    if @user.destroy
      render :json=> { success: 'user was successfully deleted' }, :status=>201
    else
      render :json=> { error: 'user could not be deleted' }, :status=>422
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :current_password)
  end
end
