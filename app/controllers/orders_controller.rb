class OrdersController < ApplicationController

    def add_to_cart
        order = get_user.orders.find_or_create_by(open: true)
        order_item = order.update_or_create_order_item(product_params)
        render json: order_item, status: :created

        #   { "product": { "id": 6, "order_qty": 1 } }

    end

    def remove_from_cart
        order = get_cart
        order.remove_order_item_by_id(params[:order_item_id])
        head :no_content
        #   params - /:order_item_id
    end

    def updateOrderItemQtyInCart
        order = get_cart
        order_item = order.order_items.find(params[:order_item_id])
        order_item.update!(product_params)
        render json: order_item, status: :created

        #   params - /:order_item_id
        #   { "product": { "id": 6, "order_qty": 1 } }

    end

    def clear_cart
        get_cart.order_items.destroy_all
        head :ok
    end

    def submit_order
        order = get_cart
        order.finalize_order
        binding.pry
        render json: order, inlcude: ['order_items','order_items.product'], status: :created
    end

    private

    def get_user
        User.find(session[:user_id])
    end

    def get_cart
        get_user.orders.find_by(open: true)
    end

    def product_params
        params.require(:product).permit(:product_id, :order_qty)
    end
end
