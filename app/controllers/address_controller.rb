require 'httparty'
require 'json'

class AddressController < ApplicationController

    def validate_address

        options = {
                body: JSON.generate({ address: { addressLines: "#{address_params[:address]}"}}),
                headers: { 'Content-Type' => 'application/json' },
                format: :json
            }

        response = HTTParty.post("https://addressvalidation.googleapis.com/v1:validateAddress?key=#{ENV['GOOGLE_API_KEY']}", options)

        if response.code == 200 && response['result']['uspsData']['dpvConfirmation'] != 'N'  
            
            binding.pry
            render json: { success: response['result']['address']['formattedAddress']}, status: :created
        
        elsif response.code == 200

            render json: { error: 'Address not validated.'}, status: :unprocessable_entity
        else
            render json: {error: 'Request failed, try again'}, status: :unprocessable_entity
        end


    end

    private

    def address_params
        params.require(:shipping).permit( :address )
    end


end
