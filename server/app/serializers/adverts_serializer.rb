# frozen_string_literal: true

class AdvertsSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :owner, :image

  def as_json
    super()
  end
end
