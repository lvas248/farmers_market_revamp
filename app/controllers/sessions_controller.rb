class SessionsController < ApplicationController

    #login
    def create
        user = User.find_by( email: params[:email])
        
        if user&.authenticate(params[:password])

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
            render json: user, include: [ 'orders'], status: :ok
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
