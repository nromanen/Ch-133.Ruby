require "rails_helper"

RSpec.describe UserInfosController, type: :request  do
  include Warden::Test::Helpers

  describe "show action" do
    it "renders show template if user exist" do
      @user = create(:user)
      @info = create(:user_info, user_id: @user.id)
      get "/users/#{@user.id}/user_infos"
      expect(response).to have_http_status(:success)
    end

    it "show 404 template if user info not exist" do
      @user = create(:user)
      get "/users/#{@user.id}/user_infos"
      expect(response).to have_http_status(404)
    end

    it "show 404 template if user not exist" do
      get '/users/notexistuserid/user_infos'
      expect(response).to have_http_status(404)
    end

  end

  describe "update action" do
    it "create user info if it not exist" do

      @user = create(:user)
      login_as(@user)

      put "/users/#{@user.id}/user_infos", params: {
          user_info: {
              first_name: "Test",
              last_name: "TestLL",
              phone: "0507741715"
          }
      }
      expect(response).to have_http_status(:success)

    end

    it "not valid input fields if user info not exist" do

      @user = create(:user)
      login_as(@user)

      put "/users/#{@user.id}/user_infos", params: {
          user_info: {
              first_name: "T",
              last_name: "T",
              phone: "0s"
          }
      }
      expect(response).to have_http_status(:unprocessable_entity)

    end

    it "update user info if it exist" do
      @user = create(:user)
      @info = create(:user_info, user_id: @user.id)
      login_as(@user)

      put "/users/#{@user.id}/user_infos", params: {
          user_info: {
              first_name: "Test",
              last_name: "TestLLs",
              phone: "0507741715"
          }
      }
      expect(response).to have_http_status(:success)
    end

    it "not valid input fields if user info exist" do
      @user = create(:user)
      @info = create(:user_info, user_id: @user.id)
      login_as(@user)

      put "/users/#{@user.id}/user_infos", params: {
          user_info: {
              first_name: "T",
              last_name: "T",
              phone: "0s",
          }
      }
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "not valid if user open another user info" do
      @user = create(:user)
      @info = create(:user_info, user_id: @user.id)
      login_as(@user)

      put "/users/ab483f8d-33d5-4289-84c1-09e9993bfc73/user_infos", params: {
          user_info: {
              first_name: "Test",
              last_name: "TestLLs",
              phone: "0507741715",
          }
      }

      expect(response).to have_http_status(:forbidden)
    end

  end

end