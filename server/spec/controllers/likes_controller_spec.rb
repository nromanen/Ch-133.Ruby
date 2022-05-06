require 'rails_helper'

RSpec.describe LikesController, :type => :request do
    include ControllerHelpers

    before(:all) do
        @user = create(:user)
        @category = create(:category)
        @advert = create(:advert, user_id: @user.id, category_id: @category.id)
    end

    describe "GET index" do
        it "get all @likes" do
            get "/adverts/#{@advert.id}/likes"
            expect(response).to have_http_status(:ok)
        end
    end

    describe "POST create" do
        it "like unauthorized" do
            post "/adverts/#{@advert.id}/likes"
            expect(response).not_to have_http_status(:ok)
        end
    end

    after(:all) do
        @advert.destroy
        @user.destroy
        @category.destroy
    end
end
