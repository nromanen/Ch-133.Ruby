# frozen_string_literal: true

class CreateAdverts < ActiveRecord::Migration[7.0]
  def change
    create_table :adverts, id: :uuid do |t|
      t.string :title
      t.string :text
      t.string :status
      t.string :image

      t.timestamps
    end
    add_reference :adverts, :category, type: :uuid
    add_reference :adverts, :user, type: :uuid
  end
end
