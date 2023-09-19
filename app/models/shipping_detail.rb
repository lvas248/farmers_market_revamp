class ShippingDetail < ApplicationRecord

    validates :address, presence: true
    validates :name, presence: true
    validates :email, presence: true
    validates :phone, presence: true

    belongs_to :order

    has_one :address, as: :addressable, dependent: :destroy
    
    accepts_nested_attributes_for :address
end

