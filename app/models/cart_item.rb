class CartItem < ApplicationRecord
  belongs_to :cart
  belongs_to :product

  validate :confirm_inventory_available

  after_update :destroy_if_order_qty_zero

  def add_to_qty(qty)
    self.update!(order_qty: self.order_qty + qty.to_i)
  end

  private

  def confirm_inventory_available
    unless self.order_qty <= self.product.qty_avail
      errors.add(:order_qty, "Not enough inventory to fulfill")
    end
  end

  def destroy_if_order_qty_zero
    self.destroy unless self.order_qty > 0
  end


end
