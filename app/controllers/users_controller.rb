class UsersController < ApplicationController

    # signup 
        def create
            user = User.create!(user_params)
    
            guest = Guest.find_by(id: session[:guest_id])
                
            #if guest is in session, merge carts, destroy that session
            if guest
                user.cart.merge_with_order(guest.cart)
                guest.cart.clear_cart
                session.delete :guest_id
            end
            
            session[:user_id] = user.id        
            render json: user, status: :created
        end
    
        #refresh
        def show
    
            user = get_user
            if user.present?
                
                render json: user, status: :ok
            
            else 

                guest = Guest.find_by(id: session[:guest_id])
                if guest.present?
                    # binding.pry
                    render json: guest, status: :unauthorized
                
                else
                    new_guest = Guest.create!()
                    session[:guest_id] = new_guest.id
                    render json: new_guest, status: :unauthorized
                end

            end
    
        end
    
        private
    
        def user_params
            params.require(:user).permit(:email, :password, :password_confirmation)
        end
    
        def get_user
            User.find_by(id: session[:user_id])
        end
    
    end