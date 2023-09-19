class OrdersController < ApplicationController


    def submit_order
    
        user = User.find_by(id: session[:user_id]) 
        guest = Guest.find_by(id: session[:guest_id])


        if user.present?
            new_order = user.orders.new
            new_order.build_shipping_detail(order_params).save

            new_order.transfer_cart_to_order(user.cart)

            new_order.update_product_inventory_for_order_items
            user.cart.clear_cart
         
            render json: new_order, status: :created
        
        elsif guest.present?

            new_order = Order.new
            new_order.build_shipping_detail(order_params).save
            
            new_order.transfer_cart_to_order(guest.cart)

            new_order.update_product_inventory_for_order_items
            guest.cart.clear_cart

            render json: new_order, status: :created
        
        end
    end

    private


    def order_params
        params.require(:shipping_detail).permit(:name, :email, :phone, address_attributes: [:street, :apartment, :city, :state, :zipcode, :country])
    end
end

# [:name, :email, :phone, address: [:street, :apartment, :city, :state, :zipcode]]
