class OrdersController < ApplicationController


    def submit_order
        user = User.find_by(id: session[:user_id]) || Guest.find_by(id: session[:guest_id])
        user.orders.find_by(open: true)
        order.finalize_order
        render json: order, inlcude: ['order_items','order_items.product'], status: :created
    end

    private


    def order_item_params
        params.require(:order_item).permit(:product_id, :order_qty)
    end
end
