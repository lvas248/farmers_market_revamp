class Order < ApplicationRecord
    belongs_to :user
  
    has_many :order_items, dependent: :destroy
    has_many :products, through: :order_items
  
    def update_or_create_order_item(product_params)
      order_item = self.order_items.find_by(product_id: product_params[:product_id])
      order_item ? order_item.add_to_qty(product_params[:order_qty]) : order_item = self.order_items.create!(product_params)
      order_item
    end
  
  end