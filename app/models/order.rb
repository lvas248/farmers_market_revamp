class Order < ApplicationRecord

  after_create :update_inventory

  validates :shipping_detail, presence: true

  belongs_to :orderable, polymorphic: true

  has_many :order_items, dependent: :destroy
  has_many :products, through: :order_items

  belongs_to :shipping_detail
  
  accepts_nested_attributes_for :shipping_detail, :order_items

  def calculate_subtotal
    self.order_items.sum(:subtotal)
  end

  private

  def update_inventory
    self.order_items.each{ |o| o.fulfill_order_item }
  end






end