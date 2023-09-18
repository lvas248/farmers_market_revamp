class CreateOrderItems < ActiveRecord::Migration[6.1]
  def change
    create_table :order_items do |t|
      t.references :itemable, polymorphic: true, index: true
      t.references :product, index: true
      t.integer :order_qty

      t.timestamps
    end
  end
end
