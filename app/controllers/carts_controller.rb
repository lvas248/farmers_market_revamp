class CartsController < ApplicationController

    def add_to_cart

        user = User.find_by(id: session[:user_id]) || Guest.find_by(id: session[:guest_id])

        if user.present?
            cart = user.cart
            cart_item = cart.update_or_create_cart_item(cart_item_params)
            render json: cart_item, status: :created

        else
            new_guest = Guest.create!()
            session[:guest_id] = new_guest.id
            cart_item = new_guest.cart.cart_items.create!(cart_item_params)
            render json: cart_item, status: :created
        end


    end

    def remove_from_cart
        user = User.find_by(id: session[:user_id]) || Guest.find_by(id: session[:guest_id])
        
        if user.present?
            user.cart.remove_cart_item_by_id(params[:cart_item_id])
            head :no_content
        else 
            render_not_found
        end
    
    end

    def updateOrderItemQtyInCart

        user = User.find_by(id: session[:user_id]) || Guest.find_by(id: session[:guest_id])
        if user.present?
            cart_item = user.cart.cart_items.find(params[:cart_item_id])
            cart_item.update!(cart_item_params)
            render json: cart_item, status: :created
        else 
            render_not_found
        end

    end 

    def clear_cart
        user = User.find_by(id: session[:user_id]) || Guest.find_by(id: session[:guest_id])
        user.cart.cart_items.destroy_all
        head :ok
    end

    private



    def cart_item_params
        params.require(:cart_item).permit(:product_id, :order_qty)
    end


end
