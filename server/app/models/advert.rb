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
  validates :image, allow_blank: true, blob: { content_type: %w[image/png image/jpg image/jpeg image/webp], message: I18n.t("imageNotValid") }
  validates :image, allow_blank: true, blob: { size_range: 1..(5.megabytes), message: I18n.t("imageTooLarge") }
  validates :title, uniqueness: true



  def image_url
    unless self.image.blank?
      url_for(self.image)
    end
  end

  def owner
    { owner_id: self.user.id,
     owner_name: self.user.nick_name }
  end

end
