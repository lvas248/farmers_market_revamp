class Order < ApplicationRecord

  after_save :update_inventory

  validates :shipping_detail, presence: true


  belongs_to :orderable, polymorphic: true
  has_many :order_items, dependent: :destroy
  has_many :products, through: :order_items
  has_one :shipping_detail
  
  accepts_nested_attributes_for :shipping_detail

  def transfer_cart_to_order(cart)
    cart.cart_items.each { |i| self.order_items.build(product: i.product, order_qty: i.order_qty)}
  end

  private

  def update_inventory
  
    self.order_items.each{ |o| o.fulfill_order_item }
  end




end