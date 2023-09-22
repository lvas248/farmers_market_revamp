class UserCartSerializer < ActiveModel::Serializer
  attributes :id, :filtered_cart_items

  def filtered_cart_items
    self.object.cart_items.map{|i| {id: i.id, product: i.product, order_qty: i.order_qty}}
  end

end
