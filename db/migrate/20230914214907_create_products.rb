class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :name
      t.string :description
      t.float :price
      t.string :image
      t.integer :qty_avail
      t.string :season
      t.string :produce_type

      t.timestamps
    end
  end

end
