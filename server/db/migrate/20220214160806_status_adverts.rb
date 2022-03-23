# frozen_string_literal: true

class StatusAdverts < ActiveRecord::Migration[7.0]
  def change
    change_column_default :adverts, :status, from: nil, to: "0"
  end
end
