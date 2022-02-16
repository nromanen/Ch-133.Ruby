class UserInfo < ApplicationRecord
  belongs_to :user
  validates :phone, length: { in: 6..13 }, uniqueness: true,
            format: { with: /\A(?:\+?\d{1,3}\s*-?)?\(?(?:\d{3})?\)?[- ]?\d{3}[- ]?\d{4}+\z/,
                     message: "does not match format requirements" }
  validates :first_name, length: { minimum: 3 },
            format: { with: /\A[a-zA-Z]+\z/,
                     message: "only allows letters" }
  validates :last_name, length: { minimum: 3 },
            format: { with: /\A[a-zA-Z]+\z/,
                      message: "only allows letters" }
end
