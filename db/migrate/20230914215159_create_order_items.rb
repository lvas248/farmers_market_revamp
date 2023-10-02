class CreateOrderItems < ActiveRecord::Migration[6.1]
  def change
    create_table :order_items do |t|
      t.references :order, index: true
      t.references :product, index: true
      t.decimal :subtotal, precision: 6, scale: 2
      t.integer :order_qty

      t.timestamps
    end
  end
end
