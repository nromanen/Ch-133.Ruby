# frozen_string_literal: true

require "rails_helper"

RSpec.describe Users::RegistrationsController, type: :controller  do
  include Warden::Test::Helpers
  before(:each) do
    @request.env["devise.mapping"] = Devise.mappings[:user]
  end
  describe "user registration" do
      it "register user success" do
        post :create, params: { user: { email: "u@ser.email", nick_name: "nick", password: "Qwerty123",
                                password_confirmation: "Qwerty123" } }
        expect(response).to have_http_status(:created)
      end
      it "register user failed" do
        post :create, params: { user: { email: "user.email", nick_name: "nick", password: "Qwerty123",
                                       password_confirmation: "Qwerty123" } }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
end
