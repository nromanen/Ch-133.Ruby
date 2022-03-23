# frozen_string_literal: true

class Comment < ApplicationRecord
  has_one :user
  has_one :advert

  validates :text, presence: true, length: { minimum: 5, maximum: 300 }
  validates :advert_id, presence: true
end
