class UserOrderSerializer < ActiveModel::Serializer
  attributes :id, :filtered_orders

  def filtered_orders
    self.object.order_items.map { |i| { id: i.id, product: i.product, order_qty: i.order_qty } }
  end
end
