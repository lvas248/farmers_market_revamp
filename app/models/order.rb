class Order < ApplicationRecord
    belongs_to :user
  
    has_many :order_items, dependent: :destroy
    has_many :products, through: :order_items
  
    def update_or_create_order_item(product_params)
      order_item = self.order_items.find_by(product_id: product_params[:product_id])
      order_item ? order_item.add_to_qty(product_params[:order_qty]) : order_item = self.order_items.create!(product_params)
      order_item
    end

    def remove_order_item_by_id(order_item_id)
      self.order_items.find_by(id: order_item_id).destroy
    end

    def finalize_order
      #update product qtys
      self.order_items.each{ |o| o.fulfill_order_item }
      #closes order
      self.update!(open: false)
    end

    
  
  end