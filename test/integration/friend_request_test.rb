require 'test_helper'

class FriendRequestTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
  def setup
    @user = users(:jason)
    @friend = users(:user2)
  end
  test "send a friend request" do
    sign_in @user
    get user_path(@friend)
    assert_template 'users/show'
    #should have option to send friend request
    assert_select "a[href=?]", user_friendships_path(@friend)
    post user_friendships_path(@friend)
    @friendship = @friend.friendships.first
    assert_not @friendship.nil?
    #should show flash and request sent label instead of send button
    get user_path(@friend)
    assert_select "span.label", "Request Sent"
    assert_not flash.empty?
    assert_select "a[href=?]", user_friendships_path(@friend), count: 0
    sign_out @user
    #other user should get notification
    sign_in @friend
    get root_path
    assert_select "li.dropdown" do
      assert_select "a", "Notifications 1"
      assert_select "a[href=?]", user_friendships_path(@friend)
    end
    #friend has list of requests and can accept
    get user_friendships_path(@friend)
    assert_template 'friendships/index'
    assert_select "a[href=?]", user_friendship_path(@friend, @friendship, status: 'active')
    #accepted friendship association established on both users
    patch user_friendship_path(@friend, @friendship), params: { id: @friendship.id, status: 'active' }
    @friend.reload
    @user.reload
    assert @friend.friendships.first.status == 'active'
    assert @user.friendships.first.status == 'active'
    #user profile displays friends instead of request sent
    get user_path(@user)
    assert_select 'span.label', 'Friends!'
  end
end
