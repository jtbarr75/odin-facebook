Rails.application.routes.draw do
  root 'users#index'
  devise_for :users
  resources :users, only: [:index, :show] do
    resources :posts, only: [:show, :create, :destroy]
    resources :friendships, only: [:index, :create, :update, :destroy]
  end

  resources :posts, only: :index do 
    resources :comments, only: :create
    resources :likes, only: :create
  end
  
  resources :comments, only: :destroy do
    resources :likes, only: :create
  end

  resources :likes, only: :destroy
end
