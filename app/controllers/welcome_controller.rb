class WelcomeController < ApplicationController
  before_action :require_login, only: [:app]
  
  def app
  end

  def login
  end

  def signup
  end

end
