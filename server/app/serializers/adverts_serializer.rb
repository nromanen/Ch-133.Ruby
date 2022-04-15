# frozen_string_literal: true

class AdvertsSerializer
  include JSONAPI::Serializer
  attributes :id, :title, :owner, :image_url

  def as_json
    super()
  end
end
