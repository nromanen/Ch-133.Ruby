# frozen_string_literal: true

class Advert < ApplicationRecord
  has_one :user
  has_one :category
  has_many :comments
  has_many :likes
end
