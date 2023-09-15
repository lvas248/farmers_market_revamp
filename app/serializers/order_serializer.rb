class OrderSerializer < ActiveModel::Serializer
  attributes :id, :open

  has_many :order_items

end
