class CartsController < ApplicationController

    def add_to_cart
        #get user/guest in session
        cart_owner = User.find_by(id: session[:user_id]) || Guest.find_by(id: session[:guest_id])

        #if user/guest is in session, add item(s) to cart
        if cart_owner.present?
            cart = cart_owner.cart
            #search cart for cart_item w/ same product, if already exists in cart, update order_qty, else create new cart_item + add to cart
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
        cart_owner = get_cart_owner
        cart_owner.cart.remove_cart_item_by_id(params[:cart_item_id])
        head :no_content
    end

    def updateOrderItemQtyInCart
        cart_owner = get_cart_owner
        # search cart for specific cart item
        cart_item = cart_owner.cart.cart_items.find(params[:cart_item_id])
        # update order_qty of cart_item
        cart_item.update!(cart_item_params)
        render json: cart_item, status: :created
      
    end 

    def clear_cart
        cart_owner = get_cart_owner
        cart_owner.cart.clear_cart
        head :ok
    end

    private

    def get_cart_owner
        User.find_by(id: session[:user_id]) || Guest.find_by!(id: session[:guest_id])
    end

    def cart_item_params
        params.require(:cart_item).permit(:product_id, :order_qty)
    end


end
