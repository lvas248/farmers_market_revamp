class OrdersController < ApplicationController


    def index
        user = get_user
        render json: user.orders.order(created_at: :desc), status: :ok
    end

    def submit_order
    
        user = User.find_by(id: session[:user_id]) || Guest.find_by(id: session[:guest_id])

        if user.present?


            new_order = user.orders.new()
            new_order.update( shipping_detail: ShippingDetail.find_or_initialize_by(order_params))
            new_order.transfer_cart_to_order(user.cart)            
            new_order.save!
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
        params.require(:shipping_detail).permit(:name, :email, :phone, :street, :apartment, :city, :state, :zipcode, :country, :id)
    end


end

