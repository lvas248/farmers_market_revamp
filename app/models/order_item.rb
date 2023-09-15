class OrderItem < ApplicationRecord
    belongs_to :product
    belongs_to :order
  
    validate :confirm_inventory_available
    
    private

    def confirm_inventory_available
      unless self.order_qty <= self.product.qty_avail
        errors.add(:order_qty, "Not enough inventory to fulfill")
      end
    end

  end