# frozen_string_literal: true

class Category < ApplicationRecord
  before_validation :capitalize_name

  validates :name, uniqueness: {message: I18n.t('.validation.uniqueness') }, 
  presence: {message: I18n.t('.validation.presence') },                    
  length:{ minimum: 3, maximum: 20, message: I18n.t('.validation.length') },
  format: { with: /\A[a-zA-Z]+\z/, message:  I18n.t('.validation.format')}
                   
  def capitalize_name
    name.capitalize!  
  end

end
