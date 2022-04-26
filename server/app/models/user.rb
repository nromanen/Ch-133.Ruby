# frozen_string_literal: true

class User < ApplicationRecord
  before_validation :set_default
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # devise :database_authenticatable, :registerable,
  #        :recoverable, :rememberable, :validatable
  devise :database_authenticatable,
         :jwt_authenticatable,
         :registerable,
         :confirmable,
         :lockable,
         :recoverable,
         jwt_revocation_strategy: JwtDenylist
  has_many :comments, dependent: :destroy
  has_many :adverts, dependent: :destroy
  has_many :likes, dependent: :destroy
  belongs_to :role, optional: true
  delegate :name, to: :role, prefix: true
  has_one :user_info, dependent: :destroy

  validates :email, presence: true, uniqueness: { uniqueness: true, message: I18n.t("taken") },
            format: { with: /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/ }
  validates :password, length: { minimum: 8, maximum: 20 }, presence: true,
            format: { with: /\A(?=.*[a-zA-Z])(?=.*[0-9]).{8,}\z/ }
  validates :nick_name, presence: true, uniqueness: true, length: { minimum: 3, maximum: 15 }
  validates :password_confirmation, length: { minimum: 8, maximum: 20 }, presence: true,
            format: { with: /\A(?=.*[a-zA-Z])(?=.*[0-9]).{8,}\z/ }
  validates_confirmation_of :password
  def set_default
    role_user = Role.find_by(name: "User")
    self.role = role_user
  end

  def get_advert_count
    self.adverts.length
  end

  def jwt_payload
    { "email" => self.email, "id" => self.id, "role" => self.role_name }
  end

  def avatar
    if user_info.nil? || user_info.image_url.nil?
      self.nick_name
    else
      user_info.image_url
    end
  end
end
