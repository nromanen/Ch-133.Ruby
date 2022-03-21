# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users,
             controllers: {
               sessions: "users/sessions",
               registrations: "users/registrations"
             }
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
  resources :categories
  resources :users,  only: %i[index] do
    get "/posts", to: "adverts#posts"
  end

  get "/myposts", to: "adverts#myposts"

  put "/advert/:id/like", to: "adverts#like", as: "like"

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
