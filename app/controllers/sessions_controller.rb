class SessionsController < ApplicationController

    #login
    def create
        user = User.find_by( email: params[:email])
        if user&.authenticate(params[:password])

            guest = Guest.find_by(id: session[:guest_id])
            
            #if guest is in session, merge carts, destroy that session
            
            if guest
                user.cart.merge_with_order(guest.cart)
                guest.cart.clear_cart
                session.delete :guest_id
            end

            session[:user_id] = user.id
            render json: user, include: ['cart.order_items.product'], status: :ok
        else 
            render json: { error: 'Invalid username or password'}, status: :unauthorized
        end
  
    end

    #logout
    def destroy
        user = User.find(session[:user_id])
        session.delete :user_id
        head :no_content
    end

    private




end

