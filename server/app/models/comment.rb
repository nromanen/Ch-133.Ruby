# frozen_string_literal: true

class Comment < ApplicationRecord
  has_one :user
  has_one :advert
end
