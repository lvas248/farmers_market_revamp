class Guest < ApplicationRecord

    after_create :create_cart

    has_one :cart, as: :cartable, dependent: :destroy
    has_many :orders

    def empty_cart
        self.cart
    end

    private

    def create_cart
        self.create_cart!
    end

end
