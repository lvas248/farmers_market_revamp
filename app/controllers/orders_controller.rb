class OrdersController < ApplicationController


    def add_to_cart

        user = User.find_by(id: session[:user_id]) || Guest.find_by(id: session[:guest_id])


        if user.present?
            order = user.orders.find_or_create_by(open: true)
            order_item = order.update_or_create_order_item(order_item_params)
            render json: order_item, status: :created

        else
            new_guest = Guest.create!()
            session[:guest_id] = new_guest.id
            order = new_guest.get_cart
            order_item = order.order_items.create!(order_item_params)
            render json: order_item, status: :created
        end


    end

    def remove_from_cart
        user = User.find_by(id: session[:user_id]) || Guest.find_by(id: session[:guest_id])
        if user.present?
            order = user.get_cart
            order.remove_order_item_by_id(params[:order_item_id])
            head :no_content
        else
            render_not_found
        end
    end

    def updateOrderItemQtyInCart

        user = User.find_by(id: session[:user_id]) || Guest.find_by(id: session[:guest_id])
       
        if user.present?
            order = user.orders.find_by(open:true)
            order_item = order.order_items.find(params[:order_item_id])
            order_item.update!(order_item_params)
            render json: order_item, status: :created
        else 
            render_not_found
        end

    end 


    def clear_cart
        user = User.find_by(id: session[:user_id]) || Guest.find_by(id: session[:guest_id])
        user.orders.find_by(open: true).order_items.each{ |i| i.destroy }
        head :ok
    end

   

    def submit_order
        user = User.find_by(id: session[:user_id]) || Guest.find_by(id: session[:guest_id])
        user.orders.find_by(open: true)
        order.finalize_order
        render json: order, inlcude: ['order_items','order_items.product'], status: :created
    end

    private

    def get_user
        User.find_by(id: session[:user_id])
    end

    def get_cart
        get_user.orders.find_by(open: true)
    end

    def order_item_params
        params.require(:order_item).permit(:product_id, :order_qty)
    end
end
