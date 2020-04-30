require 'test_helper'

class NavbarNotificationsTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
  
  def setup
    @user = users(:jason)
    @friend = users(:user2)
    @post = posts(:one)
  end

  test "should receive notifications" do
    sign_in @user
    get user_path(@friend)
    assert_template 'users/show'
    #send friend request
    post user_friendships_path(@friend)
    @friendship = @friend.friendships.first
    #like post
    post post_likes_path(@post)
    #comment on post
    post post_comments_path(@post), params: { comment: { body: 'comment' } }
    sign_out @user
    #other user should get notifications
    sign_in @friend
    get root_path
    assert_select "li.dropdown" do
      assert_select "a", "Notifications 3"
    end
    assert_select "a[href=?]", notification_path(Notification.first), "Jason Barr sent you a friend request"
    assert_select "a#notification-2", "Jason Barr liked your post"
    assert_select "a#notification-1", "Jason Barr commented on your post"
    #does not notify when commenting on or liking own post
    assert_no_difference 'Notification.count' do
      post post_likes_path(@post)
      post post_comments_path(@post), params: { comment: { body: 'comment 2' } }
    end
  end
end
