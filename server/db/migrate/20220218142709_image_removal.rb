class ImageRemoval < ActiveRecord::Migration[7.0]
  def change
    remove_column :adverts, :image
  end
end
