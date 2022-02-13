# frozen_string_literal: true

class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments, id: :uuid do |t|
      t.text :text

      t.timestamps
    end
    add_reference :comments, :advert, type: :uuid
    add_reference :comments, :user, type: :uuid
  end
end
