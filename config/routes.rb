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

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
