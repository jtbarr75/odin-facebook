require 'test_helper'

class SiteLayoutTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
  def setup
    @user = users(:jason)
  end

  test "layout links when not logged in" do
    get root_path
    assert_template 'users/index'
    assert_select "a[href=?]", root_path
    assert_select "a[href=?]", new_user_registration_path
    assert_select "a[href=?]", new_user_session_path
  end

  test "layout links when logged in" do
    sign_in @user
    get root_path
    assert_template 'welcome/app'
    assert_select "a[href=?]", root_path
    assert_select "a[href=?]", edit_user_registration_path(@user)
    assert_select "a[href=?]", user_path(@user)
    assert_select "a[href=?]", destroy_user_session_path
  end
end
