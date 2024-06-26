Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  resources :todos
  resources :users, only: [] do
    get 'me', on: :collection
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
