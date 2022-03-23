# frozen_string_literal: true

class AdvertSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :text, :image_url, :owner, :liked?

  def as_json
    super()
  end
end
