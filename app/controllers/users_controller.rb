class UsersController < ApplicationController

# signup 
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id        
        render json: user, status: :created
    end

    #refresh
    def show
        user = get_user
        render json: user, status: :ok
    end

    private

    def user_params
        params.permit(:username, :email, :password, :password_confirmation)
    end

    def get_user
        User.find(session[:user_id])
    end

end
