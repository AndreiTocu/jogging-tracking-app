Rails.application.routes.draw do
  get 'users/index'
  get 'users/create'
  namespace :api do
    resources :users
  end
end
