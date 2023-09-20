class GuestSerializer < ActiveModel::Serializer
  attributes :email

  has_one :cart, serializer: UserCartSerializer


end
