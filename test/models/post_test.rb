require 'test_helper'

class PostTest < ActiveSupport::TestCase
  def setup
    @user = users(:jason)
    @post = @user.posts.build(body: "lorem ipsum")
  end

  test "should be valid" do
    assert @post.valid?
  end

  test "user id should be present" do
    @post.user_id = nil
    assert_not @post.valid?
  end

  test "body should be present" do
    @post.body = "    "
    assert_not @post.valid?
  end
end
