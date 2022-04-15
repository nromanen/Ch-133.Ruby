# frozen_string_literal: true

class AdvertSerializer
  include JSONAPI::Serializer
  attributes :title, :text, :owner, :liked?, :image_url

  def as_json
    super()
  end
end
