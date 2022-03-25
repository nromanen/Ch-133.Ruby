class UserInfo < ApplicationRecord
  belongs_to :user

  validates :phone, length: { in: 6..13 }, uniqueness: true, allow_blank: true, allow_nil: false,
            format: { with: /\A(?:\+?\d{1,3}\s*-?)?\(?(?:\d{3})?\)?[- ]?\d{3}[- ]?\d{4}+\z/,
                      message: I18n.t("phoneNotValid") }
  validates :first_name, length: { minimum: 3 }, allow_blank: true, allow_nil: false,
            format: { with: /\A[a-zA-Z]+\z/,
                      message: I18n.t("nameNotValid") }
  validates :last_name, length: { minimum: 3 }, allow_blank: true, allow_nil: false,
            format: { with: /\A[a-zA-Z]+\z/,
                      message: I18n.t("nameNotValid") }
end
