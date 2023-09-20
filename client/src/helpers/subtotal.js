function getSubtotal(cart){
    return cart?.reduce((acc, order_item) =>{
        return acc + order_item.product.price * order_item.order_qty
    }, 0).toFixed(2)
}

export default getSubtotal;