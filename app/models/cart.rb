class Cart < ApplicationRecord
    
    has_many :cart_items, dependent: :destroy


    def clear_cart
        self.cart_items.destroy_all
    end

    def merge_carts(guest_cart)
        # For each order_item in guest_cart, search user cart to if it has an order_item with the same product
          guest_cart.cart_items.each do |i|
    
            cart_item = self.cart_items.find_by(product_id: i.product_id)
         
        # if user_cart has product already, update user_cart.order_item.order_qty => guest_cart qty + user_cart qty
           
          if cart_item
              cart_item.update!(order_qty: cart_item.order_qty + i.order_qty)
            else
              self.cart_items.create!(product_id: i.product_id, order_qty: i.order_qty)
            end
          end
    
         
    end

    def update_or_create_cart_item(cart_item_params)

        #check if cart already has an cart_item with a product id =  cart_item_params[:product_id]
        
        cart_item =  self.cart_items.find_by(product_id: cart_item_params[:product_id])

        cart_item.nil? ? cart_item = self.cart_items.create!(cart_item_params) : cart_item.add_to_qty(cart_item_params[:order_qty])
        
        cart_item

    end

    def remove_cart_item_by_id(cart_item_id)
        self.cart_items.destroy_by(id: cart_item_id)
    end
    
end