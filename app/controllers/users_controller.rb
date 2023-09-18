class UsersController < ApplicationController

# signup 
    def create
        user = User.create!(user_params)

        guest = Guest.find_by(id: session[:guest_id])
            
        #if guest is in session, merge carts, destroy that session
        
        if guest
            guest_cart = guest.get_cart
            user_cart = user.get_cart
            user_cart.merge_with_order(guest_cart)
            guest.empty_cart
            session.delete :guest_id
        end
        
        session[:user_id] = user.id        
        render json: user, status: :created
    end

    #refresh
    def show
        user = get_user
        
        if user.present?
            render json: user, include: [ 'orders.order_items.product'], status: :ok
        
        elsif guest = Guest.find_by(id: session[:guest_id])

            if guest.present?
                render json: guest, include: [ 'orders.order_items.product'], status: :unauthorized
            
            else
                new_guest = Guest.create!()
                session[:guest_id] = new_guest.id
                render json: new_guest, include: [ 'orders.order_items.product'], status: :unauthorized
            end
        end

    end

    private

    def user_params
        params.permit(:email, :password, :password_confirmation)
    end

    def get_user
        User.find_by(id: session[:user_id])
    end

end
