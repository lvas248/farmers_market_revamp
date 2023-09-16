import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { removeFromCart, updateOrderItem } from "../../redux/slices/cartSlice";

function CheckoutItem({order_item}) {

    const history = useHistory()
    const dispatch = useDispatch()

    const [ editQty, setEditQty ] = useState(order_item?.order_qty)

    function updateEditQty(e){
        setEditQty(e.target.value)
    }

    function navgateToProductDeatil(){
        history.push(`/product/${order_item.product?.id}`)
    }

    function deleteCheckoutItem(){
        dispatch(removeFromCart({order_item_id: order_item.id}))
    }


    function updateItemQty(){
        dispatch(updateOrderItem({ order_item_id: order_item.id, submitObj: { product: { product_id: order_item.product.id, order_qty: editQty }}}))
    }




    return ( 
        <div className='border-t border-b grid grid-cols-9 gap-1 p-3 text-xs '>
            
            <div className='col-span-5 flex'>

                <button 
                    className='p-5 bg-stone-100'
                    onClick={navgateToProductDeatil}
                    >
                    <img className='h-[60px] w-[60px]' alt={order_item?.product?.name} src={order_item?.product?.image}/>

                </button>
                <div className='p-2 h-[100%] flex flex-col  justify-between'>
                    <div className='grid gap-1'>
                        <button onClick={navgateToProductDeatil} className='text-left'>{order_item?.product?.name}</button>
                        <p className='text-stone-400 '>{order_item?.product?.description}</p>
                        <p className='text-stone-400 hidden sm:block'>{order_item?.product?.season?.split(',').join(' | ')}</p>
                    </div>

                    <div className='flex gap-1 text-[9px]'>
                        <button onClick={deleteCheckoutItem} className=''>remove</button>
                        <button onClick={updateItemQty} className=''>update</button>
                    </div>
                </div>


            </div>

            <div className='col-span-4 flex flex-col sm:grid sm:grid-cols-3'>

                <div className='flex gap-1 place-content-center my-auto'>
                    <label className='my-auto'>qty</label>
                    <input className=' h-[4vh] w-[4vh] border-2 text-center p-1 ' type='number' value={editQty} onChange={updateEditQty} min={0} />
                </div>

                <div className=' gap-1 place-content-center my-auto hidden sm:flex'>
                    <p>${(Math.round(order_item?.product?.price * 100)/100).toFixed(2)}</p>
                </div>

                <div className='flex gap-1 place-content-center my-auto'>
                    <p>${(Math.round(order_item?.product?.price * order_item?.order_qty * 100)/100).toFixed(2)}</p>
                </div>


            </div>
            
        </div> 
        
    );
}

export default CheckoutItem;