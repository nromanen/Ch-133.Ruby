# frozen_string_literal: true

class AdvertSerializer < ActiveModel::Serializer
  attributes :title, :text, :image_url, :owner, :liked?

  has_many :comments
  def as_json
    super()
  end
end
