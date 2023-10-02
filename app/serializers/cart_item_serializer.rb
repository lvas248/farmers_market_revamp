class CartItemSerializer < ActiveModel::Serializer
  attributes :id, :order_qty, :subtotal

  has_one :product

 

end
