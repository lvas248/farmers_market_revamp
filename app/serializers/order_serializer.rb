class OrderSerializer < ActiveModel::Serializer
  attributes :id, :filtered_order_items, :created_at

  has_one :shipping_detail

  def filtered_order_items
    self.object.order_items.map { |i| { id: i.id, product: i.product, order_qty: i.order_qty } }
  end



end
