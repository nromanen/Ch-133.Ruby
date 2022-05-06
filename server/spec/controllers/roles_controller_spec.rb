require 'rails_helper'

RSpec.describe RolesController, type: :controller do
    describe "GET index" do
      it "get @roles" do
        get :index
        expect(response).to have_http_status(:ok)
      end
    end
end
