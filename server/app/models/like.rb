# frozen_string_literal: true

class Like < ApplicationRecord
  has_one :user
  has_one :advert
end
