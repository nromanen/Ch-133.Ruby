# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users,
             controllers: {
               sessions: "users/sessions",
               registrations: "users/registrations"
             }

  resources :adverts do
    resources :comments
  end

  resources :categories, :comments
end
