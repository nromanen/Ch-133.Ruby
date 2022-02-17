# frozen_string_literal: true

class Category < ApplicationRecord
  before_validation :capitalize_name

  validates :name, uniqueness: true, 
  presence: true,                    
  length:{ minimum: 3, maximum: 20},
  format: { with: /\A[a-zA-Z]+\z/}
                   
  def capitalize_name
    name.capitalize!  
  end

end
