class CreateCarts < ActiveRecord::Migration[6.1]
  def change
      create_table :carts do |t|
        t.references :cartable, polymorphic: true, index: true
        t.timestamps
      end
  end
end