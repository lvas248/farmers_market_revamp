import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { removeFromCart, updateCartItem, removeErrors } from "../redux/slices/cartSlice";
import plus from '../assets/Icons/icons8-plus-100.png'
import minus from '../assets/Icons/icons8-minus-100.png'


function CheckoutItem({cart_item}) {
    

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(()=>{
        //removes errors when component unmounts
        return()=>{
            dispatch(removeErrors())
        }
    },[dispatch])


    const [ editQty, setEditQty ] = useState(cart_item?.order_qty)

    function incrementOrderQty(){
        if(editQty < cart_item?.product?.qty_avail) setEditQty(editQty + 1)
    }
    function decrementOrderQty(){
        if(editQty > 0 ) setEditQty(editQty - 1)
    }
   

    function navgateToProductDeatil(){
        history.push(`/product/${cart_item.product?.id}`)
    }

    function deleteCheckoutItem(){
        dispatch(removeFromCart({cart_item_id: cart_item.id})).then(res => console.log(res))
    }


    function updateItemQty(){
        dispatch(updateCartItem({ cart_item_id: cart_item.id, submitObj: { product_id: cart_item.product.id, order_qty: editQty } }))
    }


    return ( 
        <div className='border-t border-b grid grid-cols-9 gap-1 p-3 text-xs '>
            
            <div className='col-span-5 flex'>

                <button 
                    className='p-5 bg-stone-100'
                    onClick={navgateToProductDeatil}
                    >
                    <img className='max-h-[50px]' alt={cart_item?.product?.name} src={cart_item?.product?.image}/>
                </button>

                <div className='p-2 h-[100%] flex flex-col  justify-between'>
                    <div className='grid gap-1'>
                        <button onClick={navgateToProductDeatil} className='text-left'>{cart_item?.product?.name}</button>
                        <p className='text-stone-400 '>{cart_item?.product?.description}</p>
                        <p className='text-stone-400 hidden sm:block'>{cart_item?.product?.season?.split(',').join(' | ')}</p>
                    </div>

                    <div className='flex gap-1 text-[10px]'>
                        <button onClick={deleteCheckoutItem} className='underline'>remove</button>
                        <button onClick={updateItemQty} className='underline'>update</button>
                    </div>
                </div>


            </div>

            <div className='col-span-4 flex flex-col sm:grid sm:grid-cols-3'>

                
                <div className='grid place-content-center'>
                    
                    <div className='flex gap-1 place-content-center my-auto'>
                        {/* <label className='my-auto'>qty</label> */}
                        <button onClick={decrementOrderQty}>
                            <img className='h-[20px]' alt='decrement' src={minus} />
                        </button>

                        <p className='grid place-content-center text-md'>{editQty}</p>
                    
                        <button onClick={incrementOrderQty}>
                            <img className='h-[20px]' alt='increment' src={plus} />
                        </button>

                    </div>
                </div>


                <div className=' gap-1 place-content-center my-auto hidden sm:flex'>
                    <p>${cart_item?.product.price}</p>
                </div>

                <div className='flex gap-1 place-content-center my-auto'>
                    <p>${(Math.round(cart_item?.product?.price * cart_item?.order_qty * 100)/100).toFixed(2)}</p>
                </div>

            </div>
        </div> 
        
    );
}

export default CheckoutItem;