# frozen_string_literal: true

class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :advert

  validates :text, presence: true, length: { minimum: 5, maximum: 300 }
  validates :advert_id, presence: true
end
