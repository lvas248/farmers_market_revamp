class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.references :imageable, polymorphic: true
      t.boolean :open, default: true

      t.timestamps
    end
  end
end
