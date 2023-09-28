class OrdersController < ApplicationController

    def submit_order
        cart_owner = get_cart_owner
        new_order = cart_owner.orders.create!(order_params)
        cart_owner.cart.clear_cart
        render json: new_order, status: :created
    end

    private

    def get_cart_owner
        User.find_by(id: session[:user_id]) || Guest.find_by!(id: session[:guest_id])
    end

    def order_params
        params.require(:order).permit(:shipping_detail_id, shipping_detail_attributes: [:name, :email, :phone, :street, :apartment, :city, :state, :zipcode, :country, :id], order_items_attributes: [:product_id, :order_qty])
    end


end

