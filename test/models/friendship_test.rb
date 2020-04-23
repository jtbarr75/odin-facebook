require 'test_helper'

class FriendshipTest < ActiveSupport::TestCase

  def setup
    @user = users(:jason)
    @friend = users(:user2)
  end

  test "should create inverse friendship" do
    @user.friends << @friend
    assert @user.friends.exists?(@friend.id)
    assert @friend.friends.exists?(@user.id)
  end

  test "shouldn't create duplicate friendships" do
    @user.friends << @friend
    @user.reload
    assert_no_difference 'Friendship.count' do
      Friendship.create(user_id: @user.id, friend_id: @friend.id, status: 'pending')
    end
  end

  test "initial status should be pending" do
    @user.friends << @friend
    assert @user.friendships.first.status == 'pending'
  end
end
