class UserCartSerializer < ActiveModel::Serializer
  attributes :id, :filtered_cart_items, :cart_subtotal

  def filtered_cart_items
    self.object.cart_items.map{|i| {id: i.id, product: i.product, order_qty: i.order_qty, subtotal: i.subtotal}}
  end

  def cart_subtotal
    self.object.calculate_subtotal
  end

end
