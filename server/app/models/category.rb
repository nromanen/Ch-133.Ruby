# frozen_string_literal: true

class Category < ApplicationRecord
  before_validation :capitalize_name
  has_one_attached :image

  #will_paginate gem
  self.per_page = 10

  has_many :adverts, dependent: :nullify

  validates :name,
            uniqueness: true,
            presence: true,
            length: {
              minimum: 3,
              maximum: 20,
            },
            format: {
              with: /\A[a-zA-Z]+\z/,
            }

  def capitalize_name
    name.capitalize!
  end
end
