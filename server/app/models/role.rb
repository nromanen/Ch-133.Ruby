# frozen_string_literal: true

class Role < ApplicationRecord
  has_many :users
  validates_uniqueness_of :name
end
