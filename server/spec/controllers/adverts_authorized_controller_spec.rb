# frozen_string_literal: true

require "rails_helper"

RSpec.describe "AdvertsController", type: :request do
  include ControllerHelpers

  before(:all) do
    @user = create(:user)
    @category = create (:category)
    @advert = create(:advert, user_id: @user.id, category_id: @category.id)
  end

  before(:each) do
    @role = Role.where(name: "Admin").first
    @user_admin = build(:user, role: @role)
    sign_in(@user_admin)
  end

  it "authorized user creates an advert" do
    post "/adverts", params: { advert: { title: "Test1", text: "test1", category_id: "359fcf95-6a37-4b68-b06d-56117bfe0434", image: %w[image/png Test.png iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=] } }
    expect(response.body).to include("created")
  end

  it "admin or moderator changes an advert" do
    patch "/adverts/" + @advert.id, params: { advert: { title: "Test1", text: "test1", category_id: "359fcf95-6a37-4b68-b06d-56117bfe0434"}}
    expect(response.body).to include("updated")
  end

  it "admin or moderator deletes an advert" do
    delete "/adverts/" + @advert.id
    expect(response.body).to include("deleted")
  end

  after(:all) do
    @advert.destroy
    @user.destroy
    @category.destroy
  end
end

