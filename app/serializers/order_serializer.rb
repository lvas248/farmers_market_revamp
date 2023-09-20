class OrderSerializer < ActiveModel::Serializer
  attributes :id, :created_at

  has_many :order_items
  has_one :shipping_detail, serializer: ShippingDetailAddressSerializer




end
