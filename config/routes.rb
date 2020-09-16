Rails.application.routes.draw do
  root 'welcome#app'
  get '/home' => 'welcome#home'
 
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  get 'auth/:provider/callback', to: 'devise/sessions#create'
  get 'auth/failure', to: redirect('/')

  # get '/*path' => 'welcome#app'

  namespace 'api' do 
    namespace 'v1' do
    
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
  end
  
end
