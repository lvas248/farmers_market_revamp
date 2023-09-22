class ShippingDetail < ApplicationRecord

    validates :street, presence: true
    validates :city, presence: true
    validates :zipcode, presence: true

    validates :name, presence: true
    validates :email, presence: true
    validates :phone, presence: true

    belongs_to :order
    
end

