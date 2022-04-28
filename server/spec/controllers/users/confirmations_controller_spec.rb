# frozen_string_literal: true

require "rails_helper"

RSpec.describe Users::ConfirmationsController, type: :controller  do
  include Warden::Test::Helpers

  before(:each) do
      @user = create(:user)
      @request.env["devise.mapping"] = Devise.mappings[:user]
    end
  describe "user confirmation" do
    it "user redirected" do
      @raw  = @user.send_confirmation_instructions
      token = Devise.token_generator.digest(User, :confirmation_token, "[EMAIL_TOKEN]")
      get :show, params: { user: { confirmation_token: token } }
      expect(response).to redirect_to("#{ENV["FRONT_SIGN_IN"]}")
    end
  end
end
