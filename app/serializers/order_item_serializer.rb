class OrderItemSerializer < ActiveModel::Serializer
  attributes :id, :order_qty, :product

  has_one :product

end
