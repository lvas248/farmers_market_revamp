class UserSerializer < ActiveModel::Serializer
  attributes :email

  has_many :orders, serializer: UserOrderSerializer

  belongs_to :cart, serializer: UserCartSerializer



 

end
