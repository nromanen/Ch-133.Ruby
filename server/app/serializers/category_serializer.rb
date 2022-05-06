# frozen_string_literal: true
class CategorySerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :image_url

  def image_url
    url_for(object.image) if object.image.attachment
  end

  def as_json
    super()
  end
end
