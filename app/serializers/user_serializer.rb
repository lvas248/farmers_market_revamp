class UserSerializer < ActiveModel::Serializer
  attributes :email

  has_one :cart

  has_many :orders

 

end
