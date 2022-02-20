# frozen_string_literal: true

class Advert < ApplicationRecord
  include Rails.application.routes.url_helpers

  has_one_attached :image

  belongs_to :user
  has_one :category
  has_many :comments
  has_many :likes
  enum status: {
    unpublished: 0,
    published: 1,
    rejected: 2,
    deleted: 3
  }

  def liked?(user)
    !!self.likes.find { |like| like.user_id == user.id }
  end


  validates :title, :text, presence: true

  def get_image_url
    url_for(self.image)
  end
end
