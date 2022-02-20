# frozen_string_literal: true

Rails.application.routes.draw do
  # devise_for :users
  devise_for :users,
             controllers: {
               sessions: "users/sessions",
               registrations: "users/registrations"
             }
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
