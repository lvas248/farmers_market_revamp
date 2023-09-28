class User < ApplicationRecord

    after_create :create_cart
    
    validates :email, presence: true, uniqueness: true, format: { with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i }    
    validates :name, presence: true
    # validates :phone, presence: true, format: { with: /\A\d{10}\z/, message: "must be a 10-digit number" }

    has_secure_password

    has_many :orders, as: :orderable, dependent: :destroy
    
    has_many :shipping_details, -> { distinct }, through: :orders, dependent: :destroy

    has_one :cart, as: :cartable, dependent: :destroy


    private

    def create_cart
        self.create_cart!
    end

end