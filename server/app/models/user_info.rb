class UserInfo < ApplicationRecord
  include Rails.application.routes.url_helpers
  belongs_to :user
  has_one_attached :image

  validates :image, allow_blank: true, blob: { content_type: %w[image/png image/jpg image/jpeg image/giff], size_range: 1..(10.megabytes) }
  validates :phone, length: { in: 6..13 }, uniqueness: true, allow_blank: true, allow_nil: false,
            format: { with: /\A(?:\+?\d{1,3}\s*-?)?\(?(?:\d{3})?\)?[- ]?\d{3}[- ]?\d{4}+\z/ }
  validates :first_name, length: { minimum: 3 }, allow_blank: true, allow_nil: false,
            format: { with: /\A[a-zA-Z]+\z/ }
  validates :last_name, length: { minimum: 3 }, allow_blank: true, allow_nil: false,
            format: { with: /\A[a-zA-Z]+\z/ }

  def image_url
    unless self.image.blank?
      url_for(self.image)
    end
  end
end
