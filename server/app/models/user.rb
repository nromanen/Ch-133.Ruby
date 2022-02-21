# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # devise :database_authenticatable, :registerable,
  #        :recoverable, :rememberable, :validatable
  devise :database_authenticatable,
         :jwt_authenticatable,
         :registerable,
         jwt_revocation_strategy: JwtDenylist
  has_many :comments, dependent: :destroy
  has_many :adverts, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_one :role
  has_one :user_info, dependent: :destroy
end
