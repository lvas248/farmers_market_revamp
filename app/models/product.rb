class Product < ApplicationRecord

    has_many :order_items
    has_many :orders, through: :order_items

    def reduce_inventory_by(qty)
        self.update!(qty_avail: self.qty_avail - qty)
    end


end
