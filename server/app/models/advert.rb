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

  def liked?
    !!self.likes.find { |like| like.user_id == current_user.id }
  end

  validates :title, :text, presence: true
  validates :image, blob: { content_type: %w[image/png image/jpg image/jpeg], size_range: 1..(10.megabytes) }


  def image_url
    url_for(self.image)
  end

  def owner
    { owner_id: self.user.id,
     owner_name: self.user.nick_name }
  end


end
