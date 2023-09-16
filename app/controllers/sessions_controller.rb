class SessionsController < ApplicationController

    #login
    def create
        user = User.find_by( email: params[:email])
        if user&.authenticate(params[:password])
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
