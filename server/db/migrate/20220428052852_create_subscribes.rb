class CreateSubscribes < ActiveRecord::Migration[7.0]
  def change
    create_table :subscribes, id: :uuid do |t|
      t.boolean :subscribed, default: true
      t.timestamps
    end
    add_reference :subscribes, :user, type: :uuid
  end
end
