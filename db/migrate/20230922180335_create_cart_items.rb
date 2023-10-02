class CreateCartItems < ActiveRecord::Migration[6.1]
  def change
    create_table :cart_items do |t|
      t.references :cart, null: false, foreign_key: true
      t.references :product, null: false, foreign_key: true
      t.integer :order_qty
      t.decimal :subtotal, precision: 6, scale: 2
      t.timestamps
    end
  end
end
