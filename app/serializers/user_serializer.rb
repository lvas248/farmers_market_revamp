class UserSerializer < ActiveModel::Serializer
  attributes :username, :cart, :orders

  has_many :orders

  def cart
    #revisit this issue: serialize this order/cart another way
    order = self.object.orders.find_by(open: true)
    if order
     { id: order.id, open: order.open, order_items: order.order_items.map{ |i| {id: i.id, product: i.product, order_qty: i.order_qty}}}  
    end
  end
  def orders
    self.object.orders.where(open: false)
  end

end
