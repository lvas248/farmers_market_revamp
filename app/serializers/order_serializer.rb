class OrderSerializer < ActiveModel::Serializer
  attributes :id

  has_many :order_items
  has_one :shipping_detail, serializer: ShippingDetailAddressSerializer




end
