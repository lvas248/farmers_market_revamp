function getSubtotal(cart_items){
    return cart_items.reduce((acc, cart_item) =>{
        return acc + cart_item.product.price * cart_item.order_qty
    }, 0).toFixed(2)
}

export default getSubtotal;