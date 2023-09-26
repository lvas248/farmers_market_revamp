class OrdersController < ApplicationController


    def index
        user = get_user
        render json: user.orders.order(created_at: :desc), status: :ok
    end

    def submit_order
    
        user = User.find_by(id: session[:user_id]) || Guest.find_by(id: session[:guest_id])

        new_order = user.orders.create!(order_params)
        user.cart.clear_cart
        
        render json: new_order, status: :created
     

    end

    private

    def get_user
        user = User.find(session[:user_id])
    end

    def order_params
        params.require(:order).permit(:shipping_detail_id, shipping_detail_attributes: [:name, :email, :phone, :street, :apartment, :city, :state, :zipcode, :country, :id], order_items_attributes: [:product_id, :order_qty])
    end


end

