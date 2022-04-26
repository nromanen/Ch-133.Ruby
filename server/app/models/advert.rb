# frozen_string_literal: true

class Advert < ApplicationRecord
  include Rails.application.routes.url_helpers

  has_one_attached :image

  belongs_to :user
  has_one :category
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
  enum status: {
    unpublished: 0,
    published: 1,
    rejected: 2,
    deleted: 3
  }

  def liked?
    # self.likes.find { |like| like.user_id == current_user.try(:id) } 
  end

  validates :title, :text, :image, presence: true
  validates :image, blob: { content_type: %w[image/png image/jpg image/jpeg image/webp], message: I18n.t("imageNotValid") }
  validates :image, blob: { size_range: 1..(5.megabytes), message: I18n.t("imageTooLarge") }
  validates :title, uniqueness: true


  def image_url
    unless self.image.blank?
      url_for(self.image)
    end
  end

  def owner
    { owner_id: self.user.id,
     owner_name: self.user.nick_name,
      owner_img: self.user.avatar }
  end
end
