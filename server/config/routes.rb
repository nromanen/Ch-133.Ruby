# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users,
             controllers: {
               sessions: "users/sessions",
               registrations: "users/registrations",
               confirmations: "users/confirmations",
               unlocks: "users/unlocks"
             }
<<<<<<<<< Temporary merge branch 1

  devise_scope :user do
    post "/send_email" => "passwords#create"
    put "users/password/edit(.:format)" => "passwords#update"
  end
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

  resources :categories, :comments
end
