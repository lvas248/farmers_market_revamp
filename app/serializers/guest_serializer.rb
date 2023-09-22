class GuestSerializer < ActiveModel::Serializer

  has_one :cart, serializer: UserCartSerializer

end
