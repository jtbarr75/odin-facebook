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
    assert_select "button", "Send Friend Request"
    post api_v1_user_friendships_path(@friend)
    @friendship = @friend.friendships.first
    assert_not @friendship.nil?
    #should show flash and 'request sent' label instead of send button
    get user_path(@friend)
    assert_select "span.label", "Request Sent"
    assert_not flash.empty?
    assert_select "div p a", "0 Friends"
    assert_select "a[href=?]", user_friendships_path(@friend), count: 1
    sign_out @user
    #friend has list of requests and can accept
    sign_in @friend
    get user_friendships_path(@friend)
    assert_template 'friendships/index'
    assert_select "a[href=?]", user_friendship_path(@friend, @friendship, status: 'active')
    #accepted friendship association established on both users
    patch user_friendship_path(@friend, @friendship), params: { id: @friendship.id, status: 'active' }
    @friend.reload
    @user.reload
    assert @friend.friendships.first.status == 'active'
    assert @user.friendships.first.status == 'active'
    #shows 1 friend on profile
    get user_path(@friend)
    assert_select "div p a", "1 Friend"
    #user profile displays friends instead of request sent
    get user_path(@user)
    assert_select 'span.label', 'Friends!'
  end

  test "unfriend someone" do
    #send request
    sign_in @user
    post api_v1_user_friendships_path(@friend)
    sign_out @user
    #accept request
    sign_in @friend
    @friendship = @friend.friendships.first
    patch api_v1_friendship_path(@friendship), params: { id: @friendship.id, status: 'active' }
    assert @user.friends_count == 1
    assert @friend.friends_count == 1
    #should have link to unfriend
    get user_friendships_path(@friend)
    assert_select "a[href=?]", user_friendship_path(@friend, @friendship, message: "Unfriended #{@user.name}")
    #unfriending removes friend relationship on both users
    delete user_friendship_path(@friend, @friendship, message: "Unfriended #{@user.name}")
    assert_not flash.empty?
    assert @user.reload.friends_count == 0
    assert @friend.reload.friends_count == 0
  end
end
