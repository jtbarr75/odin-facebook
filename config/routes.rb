Rails.application.routes.draw do

  namespace 'api' do 
    namespace 'v1' do
    
      resources :users, only: [:index, :show] do
        resources :posts, only: [:show, :create]
        resources :friendships, only: [:index, :create, :update, :destroy]
      end
    
      resources :posts, only: [:index, :show, :destroy, :update] do 
        resources :comments, only: [:create, :index]
        resources :likes, only: [:create]
      end
      
      resources :comments, only: [:destroy, :show, :update] do
        resources :likes, only: [:create, :destroy]
      end
    
      resources :likes, only: [:show, :destroy]
      resources :friendships, only: [:show]
      resources :notifications, only: [:update]
    end
  end

  resources :users, only: [:index, :show]
  resources :posts, only: [:show]
  root 'welcome#app'
  get '/login', to: 'welcome#login'
  get '/signup', to: 'welcome#signup'
  devise_for :users, controllers: { registrations: 'registrations', sessions: 'sessions' }
  
  # get 'auth/:provider/callback', to: 'devise/sessions#create'
  # get 'auth/failure', to: redirect('/')

  get '/*path' => 'welcome#app'

  
  
end
