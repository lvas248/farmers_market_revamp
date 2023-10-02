class OrderSerializer < ActiveModel::Serializer
  attributes :id, :filtered_order_items, :created_at, :order_subtotal

  has_one :shipping_detail

  def filtered_order_items
    self.object.order_items.map { |i| { id: i.id, product: i.product, order_qty: i.order_qty } }
  end

  def order_subtotal
    self.object.calculate_subtotal
  end



end
