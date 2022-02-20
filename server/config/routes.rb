# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users,
             controllers: {
               sessions: "users/sessions",
               registrations: "users/registrations"
             }
  # get 'user_infos', to: 'user_infos#index'
  # get 'user_infos/:id(.:format)', to: 'user_infos#show'
  # post 'user_infos', to: 'user_infos#create'
  # put 'user_infos', to: 'user_infos#update'
  resources :users do
    resource :user_infos
  end
  resources :adverts do
    resources :comments
  end
  resources :categories
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
