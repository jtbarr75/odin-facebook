Rails.application.routes.draw do
  root 'users#index'
  devise_for :users
  resources :users, only: [:index, :show] do
    resources :posts, only: [:show, :create, :destroy]
    resources :friendships, only: [:index, :create, :update, :destroy]
  end

  resources :posts, only: [:index, :show] do 
    resources :comments, only: :create
    resources :likes, only: [:create, :destroy]
  end
  
  resources :comments, only: [:destroy, :show] do
    resources :likes, only: [:create, :destroy]
  end

  resources :likes, only: [:show]
  resources :friendships, only: [:show]
  resources :notifications, only: [:update]
end
