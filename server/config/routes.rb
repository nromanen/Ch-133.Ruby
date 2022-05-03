# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users,
             controllers: {
               sessions: "users/sessions",
               registrations: "users/registrations",
               confirmations: "users/confirmations",
               unlocks: "users/unlocks",
               passwords: "users/passwords"
             }

  devise_scope :user do
    post "send_email" => "users/passwords#create"
    patch "users/password/:reset_password_token" => "users/passwords#update"
  end

  resources :users do
    resource :user_infos
  end

  resources :adverts do
    resources :comments
    resources :likes, only: [:index, :create, :destroy]
  end

  resources :categories, :comments, :roles

  patch "/subscribes", to: "subscribes#update"
  get "/subscribed", to: "subscribes#subscribed?"

end
