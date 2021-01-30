Rails.application.routes.draw do
  namespace :api do
    resources :users
    get '/session', to: 'sessions#session_data'
    post '/signin', to: 'sessions#create'
    delete '/signout', to: 'sessions#destroy'
  end
end
