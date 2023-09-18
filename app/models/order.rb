class Order < ApplicationRecord
    
    belongs_to :imageable, polymorphic: true
  
    has_many :order_items, dependent: :destroy
    has_many :products, through: :order_items
  
    def update_or_create_order_item(product_params)
      order_item = self.order_items.find_by(product_id: product_params[:product_id])
      order_item ? order_item.add_to_qty(product_params[:order_qty]) : ( 
        order_item = self.order_items.create!(product_params) )
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

    def merge_with_order(guest_cart)
      
    # For each order_item in guest_cart, search user cart to if it has an order_item with the same product
      guest_cart.order_items.each do |i|

        order_item = self.order_items.find_by(product_id: i.product_id)
     
    # if user_cart has product already, update user_cart.order_item.order_qty => guest_cart qty + user_cart qty
       
      if order_item
          order_item.update!(order_qty: order_item.order_qty + i.order_qty)
        else
          self.order_items.create!(product_id: i.product_id, order_qty: i.order_qty)
        end
      end

     
    end

    
  
  end