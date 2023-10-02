class OrderItem < ApplicationRecord

  belongs_to :order

  belongs_to :product

  validate :confirm_inventory_available

  before_save :update_subtotal

  def add_to_qty(qty) 
    self.update!(order_qty: self.order_qty + qty.to_i)
  end

  def fulfill_order_item
    self.product.reduce_inventory_by(self.order_qty)
  end
  
  private

  def confirm_inventory_available
    unless self.order_qty <= self.product.qty_avail
      errors.add(:order_qty, "Not enough inventory to fulfill")
    end
  end

  def update_subtotal
    self.subtotal = self.product.price * self.order_qty
  end



end