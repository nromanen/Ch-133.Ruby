# frozen_string_literal: true

class CreateLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :likes, id: :uuid, &:timestamps
    add_reference :likes, :advert, type: :uuid
    add_reference :likes, :user, type: :uuid
  end
end
