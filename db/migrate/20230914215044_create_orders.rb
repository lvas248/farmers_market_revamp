class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.references :orderable, polymorphic: true, index: true
      t.timestamps
    end
  end
end
