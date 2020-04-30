require 'test_helper'

class NavbarNotificationsTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
  
  def setup
    @user = users(:jason)
    @friend = users(:user2)
  end

  test "should receive notifications" do
    sign_in @user
    get user_path(@friend)
    assert_template 'users/show'
    #send friend request
    post user_friendships_path(@friend)
    @friendship = @friend.friendships.first
    sign_out @user
    #other user should get notification
    sign_in @friend
    get root_path
    assert_select "li.dropdown" do
      assert_select "a", "Notifications 1"
    end
    assert_select "a[href=?]", notification_path(Notification.first)
  end
end
