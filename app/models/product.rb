class Product < ApplicationRecord


    def reduce_inventory_by(qty)
        self.update!(qty_avail: self.qty_avail - qty)
    end


end
