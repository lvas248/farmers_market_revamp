import { useDispatch } from "react-redux";
import { removeFromCart, updateOrderItem } from "../redux/slices/cartSlice";
import { useState} from 'react'

function SideCartItem({cartItem}){

    const [ qty, setQty ] = useState(cartItem?.order_qty)

    const dispatch = useDispatch()
    
    function updateQty(e){
        setQty(e.target.value)
    }

    function deleteFromCart(){
        dispatch(removeFromCart({order_item_id: cartItem.id}))
    }

    function updateCart(){
        dispatch(updateOrderItem({ order_item_id: cartItem.id,  submitObj: { product: { product_id: cartItem.product.id, order_qty: qty }}})).then(res => console.log(res))
    }

    return ( 
            <div className='grid grid-cols-3 gap-10 text-center'>

                <p className='text-left'>{cartItem?.product.name}</p>

              
                <input className='text-black text-center w-fit' type='number' value={qty} onChange={updateQty} min={0} max={10}/>

                <div className='flex gap-2'>
                    <button onClick={deleteFromCart} className='text-[8px]'>remove</button>
                    <button onClick={updateCart} className='text-[8px]'>update</button>
                </div>
                

            </div>
     );
}

export default SideCartItem;