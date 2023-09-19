class CreateShippingDetails < ActiveRecord::Migration[6.1]
  def change
    create_table :shipping_details do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.references :order, index: true

      t.timestamps
    end
  end
end
