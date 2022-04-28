# frozen_string_literal: true

class AdvertSerializer < ActiveModel::Serializer
  attributes :title, :text, :image_url, :owner

  has_many :comments
  def as_json
    super()
  end
end