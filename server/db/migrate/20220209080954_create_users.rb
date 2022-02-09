class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users, id: :uuid do |t|
      t.string :nick_name

      t.timestamps
    end
    add_reference :users, :role, type: :uuid
    # add_reference :users, :user_info
  end
end
