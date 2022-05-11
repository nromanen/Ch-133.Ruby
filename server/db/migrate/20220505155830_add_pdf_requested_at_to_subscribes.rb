class AddPdfRequestedAtToSubscribes < ActiveRecord::Migration[7.0]
  def change
    add_column :subscribes, :pdf_requested_at, :timestamp
  end
end
