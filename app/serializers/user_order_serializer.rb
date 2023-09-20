class UserOrderSerializer < ActiveModel::Serializer
  attributes :id, :filtered_order_items, :filtered_shipping_detail, :created_at

  def filtered_order_items
    self.object.order_items.map { |i| { id: i.id, product: i.product, order_qty: i.order_qty } }
  end

  def filtered_shipping_detail
   { address: self.object.shipping_detail.address, email: self.object.shipping_detail.email, name: self.object.shipping_detail.name, phone: self.object.shipping_detail.phone}
  end
end
