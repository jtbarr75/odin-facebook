require 'test_helper'

class FriendshipTest < ActiveSupport::TestCase

  def setup
    @user = users(:jason)
    @friend = users(:user2)
  end

  test "should create friendship" do
    @user.friendships.create(friend_id: @friend.id, status: 'pending')
    assert @user.friends.exists?(@friend.id)
  end

  test "shouldn't create duplicate friendships" do
    @user.friendships.create(friend_id: @friend.id, status: 'pending')
    @user.reload
    assert_no_difference 'Friendship.count' do
      @user.friendships.create(friend_id: @friend.id, status: 'pending')
    end
  end

  test "status accepts only active and pending" do
    friendship = @user.friendships.new(friend_id: @friend.id, status: 'active')
    assert friendship.valid?
    friendship.status = 'pending'
    assert friendship.valid?
    friendship.status = 'other'
    assert_not friendship.valid?
  end
end
