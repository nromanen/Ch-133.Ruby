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

  get "/all_categories", to: "categories#all"

  resources :users do
    resource :user_infos
  end

  resources :comments
  resources :adverts do
    resources :likes, only: [:index, :create, :destroy]
  end
  resources :categories

  patch "/subscribes", to: "subscribes#update"
  get "/subscribed", to: "subscribes#subscribed?"

end
