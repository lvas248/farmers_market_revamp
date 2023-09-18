class Cart < ApplicationRecord
    belongs_to :cartable, polymorphic: true
    has_many :order_items, as: :itemable, dependent: :destroy


    def clear_cart
        self.order_items.each { |i| i.destroy}
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

    def update_or_create_order_item(order_item_params)

        #check if cart already has an order with a product id =  order_item_params[:product_id]
        
        order_item =  self.order_items.find_by(product_id: order_item_params[:product_id])
       
        if !order_item.nil?

            order_item.add_to_qty(order_item_params[:order_qty]) 
            return order_item
        else 
            order_item = self.order_items.create!(order_item_params) 
            return order_item
        end

    end

    def remove_order_item_by_id(order_item_id)
        self.order_items.find_by(id: order_item_id).destroy
    end
    
end