# frozen_string_literal: true

class User < ApplicationRecord
  before_save :set_default
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # devise :database_authenticatable, :registerable,
  #        :recoverable, :rememberable, :validatable
  devise :database_authenticatable,
         :jwt_authenticatable,
         :registerable,
         :confirmable,
         jwt_revocation_strategy: JwtDenylist
  has_many :comments
  has_many :adverts
  has_many :likes
  has_one :role
  has_one :user_info

  validates :email, presence: true, uniqueness: true,
            format: { with: /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/,
                      message: "Wrong format" }
  validates :password, length: { minimum: 8, maximum: 20 }, presence: true,
            format: { with: /\A(?=.*[a-zA-Z])(?=.*[0-9]).{8,}\z/,
                      message: "must include upper and lowercase letters and digits" }
  validates :nick_name, presence: true, uniqueness: true, length: { minimum: 3, maximum: 15 }

  def set_default
    user = Role.find_by(name: "User")
    self.role_id = user.id
  end
end
