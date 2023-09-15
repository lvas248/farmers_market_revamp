class OrderSerializer < ActiveModel::Serializer
  attributes :id, :open, :subtotal

  has_many :order_items

  def subtotal
    self.object.order_items.sum { |order_item| order_item.product.price * order_item.order_qty }
  end

end
