# frozen_string_literal: true

require "rails_helper"

RSpec.describe "AdvertsController", type: :request do
  include ControllerHelpers

  before(:all) do
    @advert = create(:advert)
  end

  it "renders all adverts" do
    get "/adverts"
    expect(response).to be_successful
    expect(response.body).to include("Test")
  end

  it "renders advert if it's found" do
    get "/adverts/" + @advert.id
    expect(response).to be_successful
    expect(response.body).to include("Test")
  end


  after(:all) do
    @advert.destroy
  end
end
