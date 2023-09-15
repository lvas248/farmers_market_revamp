class OrderItemSerializer < ActiveModel::Serializer
  attributes :id, :order_qty

  has_one :product

end
