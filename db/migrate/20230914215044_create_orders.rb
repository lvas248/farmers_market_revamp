class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      
      t.references :user, index: true
      t.string :shipping_address
      t.string :email

      t.timestamps
    end
  end
end
