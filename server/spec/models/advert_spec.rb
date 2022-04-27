# frozen_string_literal: true

require "rails_helper"


RSpec.describe Advert, type: :model do

  before(:all) do
    @advert1 = create(:advert)
  end


  it "is valid with valid attributes" do
    expect(@advert1).to be_valid
  end

  it "is not valid without a title" do
    @advert1.title = nil
    expect(@advert1).to_not be_valid
  end

  it "is not valid with short text" do
    @advert1.text = "tt"
    expect(@advert1).to_not be_valid
  end

  it "is not valid without a text" do
    @advert1.text = nil
    expect(@advert1).to_not be_valid
  end

  it "is not valid without a category" do
    @advert1.category_id = nil
    expect(@advert1).to_not be_valid
  end
  
  it "is not valid with non-unique title" do
    @advert1.title = "asd"
    expect(@advert1).to_not be_valid
  end

  it "owner method works" do
    expect(@advert1.owner[:owner_id]).to eq @advert1.user_id
  end

  it "img_url method works" do
    expect(@advert1.image_url).to_not eq nil
  end

  it "is attached" do
    blob = ActiveStorage::Blob.create_and_upload!(
      io: StringIO.new((Base64.decode64("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII="))),
      filename: "test.png",
      content_type: "image/png")
    @advert1.image.attach(blob)
    expect(@advert1.image).to be_attached
  end

  after(:all) do
    @advert1.destroy
  end
end


