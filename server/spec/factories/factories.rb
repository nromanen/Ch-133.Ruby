FactoryBot.define do
  factory :user_info do
    first_name { "John" }
    last_name  { "Doe" }
    phone { '0507741715' }
    after(:build) do |user_info|
      blob = ActiveStorage::Blob.create_and_upload!(
          io: StringIO.new((Base64.decode64("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"))),
          filename: 'test.png',
          content_type: 'image/png',)
      user_info.image.attach(blob)
    end
  end

  factory :user do
    email { "testUser@gmail.com" }
    password { "Qwerty123" }
    password_confirmation { "Qwerty123" }
    confirmed_at { 1.day.ago }
    nick_name { "testUser" }
  end

  factory :category do
    name { "SportCars" }
  end

  # factory :advert do
  #   title "Test"
  #   text "testtesttesttesttesttest"
  #   category_id "359fcf95-6a37-4b68-b06d-56117bfe0434"
  #   user_id "d6730ddd-1d66-487c-9c15-f6b46890a419"
  #   after(:build) do |advert|
  #     blob = ActiveStorage::Blob.create_and_upload!(
  #       io: StringIO.new((Base64.decode64("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII="))),
  #       filename: "test.png",
  #       content_type: "image/png")
  #     advert.image.attach(blob)
  #   end
  # end

end