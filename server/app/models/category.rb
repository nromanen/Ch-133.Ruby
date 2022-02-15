# frozen_string_literal: true

class Category < ApplicationRecord
  before_validation :uppercase_name

  validates :name, uniqueness: {message: t('.uniqueness')} #presence: {message: "Title can't be blank." },                    
                   #length:{ minimum: 3, maximum: 20 }#, message: "#{t(':length_allow')}"},
                   #format: { with: /\A[a-zA-Z]+\z/, message: "only allows english letters" }
                   
  def uppercase_name
    name.upcase!  
  end

end
