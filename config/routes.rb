Rails.application.routes.draw do
  namespace :api do
    resources :users
    resources :trainings, only: [:create, :update, :destroy]
    get '/session', to: 'sessions#session_data'
    post '/signin', to: 'sessions#create'
    delete '/signout', to: 'sessions#destroy'
    get '/feed/:id', to: 'trainings#show'
    post '/report', to: 'reports#show'
  end
end
