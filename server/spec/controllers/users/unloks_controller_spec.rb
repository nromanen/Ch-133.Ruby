# frozen_string_literal: true

require "rails_helper"

RSpec.describe Users::UnlocksController, type: :controller  do
  include Warden::Test::Helpers
  before(:each) do
    @request.env["devise.mapping"] = Devise.mappings[:user]
  end
  describe "unlock user" do
    it "user unlock success with redirect" do
      new_token = Devise.token_generator.digest(User, :confirmation_token, "[EMAIL_TOKEN]")
      user = User.first
      get :show, params: { user: { reset_password_token: new_token } }
      expect(response).to redirect_to("#{ENV["FRONT_SIGN_IN"]}")
    end
  end
end
