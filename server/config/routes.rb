# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users,
             controllers: {
               sessions: "users/sessions",
               registrations: "users/registrations",
               confirmations: "users/confirmations",
               unlocks: "users/unlocks"
             }

  devise_scope :user do
    post "/send_email" => "passwords#create"
    put "users/password/edit(.:format)" => "passwords#update"
  end

  resources :users do
    resource :user_infos
  end

  resources :adverts do
    resources :comments
  end

  resources :categories, :comments
end
