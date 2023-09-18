class CreateCarts < ActiveRecord::Migration[6.1]
  def change
      create_table :carts do |t|
        t.references :cartable, polymorphic: true, index: true
        t.string :shipping_address
        t.string :email
        t.timestamps
      end
  end
end