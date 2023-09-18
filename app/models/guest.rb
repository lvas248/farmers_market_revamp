class Guest < ApplicationRecord

    after_create :create_guest_cart

    has_many :orders, as: :imageable, dependent: :destroy

    def get_cart
        self.orders.find_by(open: true)
    end

    def empty_cart
        self.get_cart.order_items.each {|i| i.destroy }
    end

    private

    def create_guest_cart
        self.orders.create!()
    end



end
