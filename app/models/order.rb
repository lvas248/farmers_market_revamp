class Order < ApplicationRecord


  validates :shipping_detail, presence: true

  has_many :order_items, as: :itemable, dependent: :destroy

  has_many :products, through: :order_items

  has_one :shipping_detail
  
  accepts_nested_attributes_for :shipping_detail

  def transfer_cart_to_order(cart)
    cart.order_items.each { |i| self.order_items.create!(product: i.product, order_qty: i.order_qty)}
  end

  def update_product_inventory_for_order_items
    #update product qtys
    self.order_items.each{ |o| o.fulfill_order_item }
  end


end