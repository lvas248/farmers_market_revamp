class User < ApplicationRecord

    after_create :create_cart
    
    validates :email, presence: true, uniqueness: true

    has_secure_password

    has_many :orders, as: :imageable, dependent: :destroy

    def create_cart
        self.orders.create()
    end


    def get_cart
        self.orders.find_by(open: true)
    end

end
