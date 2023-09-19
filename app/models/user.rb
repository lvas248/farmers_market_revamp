class User < ApplicationRecord

    after_create :create_cart
    
    validates :email, presence: true, uniqueness: true

    has_secure_password

    has_many :orders, as: :orderable, dependent: :destroy

    has_one :cart, as: :cartable, dependent: :destroy

    has_many :addresses, as: :addressable, dependent: :destroy

    private

    def create_cart
        self.create_cart!
    end

end