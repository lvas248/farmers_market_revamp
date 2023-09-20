class OrdersController < ApplicationController


    def index
        user = get_user
        render json: user.orders.order(created_at: :desc), status: :ok
    end

    def submit_order
    
        user = User.find_by(id: session[:user_id]) || Guest.find_by(id: session[:guest_id])


        if user.present?
            new_order = user.orders.new
            new_order.build_shipping_detail(order_params).save

            new_order.transfer_cart_to_order(user.cart)

            new_order.update_product_inventory_for_order_items
            user.cart.clear_cart
         
            render json: new_order, status: :created
     
        else
            render_not_found
        end
    end

    private

    def get_user
        user = User.find(session[:user_id])
    end

    def order_params
        params.require(:shipping_detail).permit(:name, :email, :phone, address_attributes: [:street, :apartment, :city, :state, :zipcode, :country])
    end


end

