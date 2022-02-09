class CreateLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :likes, id: :uuid do |t|

      t.timestamps
    end
    add_reference :likes, :advert, type: :uuid
    add_reference :likes, :user, type: :uuid
  end
end
