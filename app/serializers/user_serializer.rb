class UserSerializer < ActiveModel::Serializer
  attributes :email, :name, :phone

  has_many :shipping_details
  
  has_many :orders, serializer: UserOrderSerializer

  belongs_to :cart, serializer: UserCartSerializer



 

end
