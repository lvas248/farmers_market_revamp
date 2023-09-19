class CreateAddresses < ActiveRecord::Migration[6.1]
  def change
    create_table :addresses do |t|

      t.references :addressable, polymorphic: true, index: true
      t.string :street
      t.string :apartment
      t.string :city
      t.string :state
      t.string :zipcode
      t.string :country
      t.timestamps
      
    end
  end
end
