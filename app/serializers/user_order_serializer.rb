class UserOrderSerializer < ActiveModel::Serializer
  attributes :id, :filtered_order_items, :created_at, :shipping_detail, :order_subtotal

  def filtered_order_items
    self.object.order_items.map { |i| { id: i.id, product: i.product, order_qty: i.order_qty } }
  end

  def order_subtotal
    self.object.calculate_subtotal
  end


end
