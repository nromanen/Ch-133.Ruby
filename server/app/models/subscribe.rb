class Subscribe < ApplicationRecord
  has_one :users
  has_one :adverts
  validates_uniqueness_of :user_id, scope: :advert_id
end
