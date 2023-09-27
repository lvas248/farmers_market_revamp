import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { submitOrder } from '../../redux/slices/orderSlice';

function Payment({shippingAddress}){

    const [ paymentAdded, setPaymentAdded ] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const cart = useSelector( state => state.cart.entity)

    function formatCart(){
        return cart?.map( i =>{
            return { order_qty: i.order_qty, product_id: i.product.id}
        })
    }

    function pushOrder(){
        if( paymentAdded){
            if(parseInt(shippingAddress.id)>0){
                dispatch(submitOrder( { shipping_detail_id: shippingAddress.id, order_items_attributes: formatCart() } ) ).then(res => {
                    if(res.meta.requestStatus === 'fulfilled') history.push(`/order_confirmation/${res.payload.id}`)
                })
            }else{
                dispatch(submitOrder( { shipping_detail_attributes: shippingAddress, order_items_attributes: formatCart()} )).then(res => {
                    if(res.meta.requestStatus === 'fulfilled') history.push(`/order_confirmation/${res.payload.id}`)})
                }
        }
    

    }
    
    
    return ( 
        <div className='pt-[10vh] h-screen'>

            <div className='text-xs'>
                <p className='text-sm font-bold'>Shipping Info:</p>
                <p>{shippingAddress.name}</p>
                <p>{shippingAddress.email}</p>
                <p>{shippingAddress.phone}</p>
                <p>{shippingAddress.street}</p>
                <p>{shippingAddress.apartment}</p>
                <p>{shippingAddress.city}</p>

                <div className='flex gap-2'>
                    <p>{shippingAddress.state}</p>
                    <p>{shippingAddress.zipcode}</p>
                </div>

            </div>

            <div className='grid my-5'>
                <button onClick={()=>setPaymentAdded(true)} className={`bg-black text-white p-2 w-fit m-auto ${ paymentAdded && 'hidden'}`}>Add Payment Method</button>
                <p className={`text-xs font-bold text-[#243c5a] m-auto w-fit ${ !paymentAdded && 'hidden'}`}>payment method added</p>
            </div>

            <button onClick={pushOrder} className='bg-black text-white w-full p-2'>SUBMIT ORDER</button>

        </div> 
    );
}

export default Payment