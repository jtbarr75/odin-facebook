Rails.application.routes.draw do
  root 'users#index'
  devise_for :users
  resources :users, only: [:index, :show] do
    resources :posts, only: [:create, :destroy]
    resources :friendships, only: [:index, :create, :update, :destroy]
  end

  resources :posts, only: [:index, :show] do 
    resources :comments, only: [:create, :destroy]
  end
  
end
