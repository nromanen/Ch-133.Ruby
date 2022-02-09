# frozen_string_literal: true

class CreateUserInfos < ActiveRecord::Migration[7.0]
  def change
    create_table :user_infos, id: :uuid do |t|
      t.string :first_name
      t.string :last_name
      t.string :phone

      t.timestamps
    end
    add_reference :user_infos, :user, type: :uuid
  end
end
