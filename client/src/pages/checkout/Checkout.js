import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react'
import { useHistory } from "react-router-dom";
import getSubtotal from "../../helpers/subtotal";
import ShippingAddressForm from "./ShippingAddressForm";
import { submitOrder } from '../../redux/slices/orderSlice';

function Checkout(){
    
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.entity)
    const addresses = useSelector( state => state.address.entity)
    const loggedIn = useSelector(state => state.session.loggedIn)
    const orderErrors = useSelector( state => state.order.error)

    const [ shippingAddress, setShippingAddress ] = useState({
        id:'',
        name: '',
        email: '',
        phone: '',
        street: '',
        apartment: '',
        city: '',
        state: '',
        zipcode: '',
        country: ''          
    })
    const [ shippingInputIsOpen, setShippingInputIsOpen ] = useState(!loggedIn)

    const [ paymentAdded, setPaymentAdded ] = useState(false)

   
    const history = useHistory()
    const subtotal = getSubtotal(cart)

    function navigateToCart(){
        history.push('/cart')
    }

    function toggleShippingInput(){
        resetShippingAddressObj()
        setShippingInputIsOpen(!shippingInputIsOpen)     
    }

    function resetShippingAddressObj(){
        setShippingAddress({
            id:'',
            name: '',
            email: '',
            phone: '',
            street: '',
            apartment: '',
            city: '',
            state: '',
            zipcode: '',
            country: ''          
        })
    }

    function updateShippingInfo(e){
        const copy = {...shippingAddress}
        copy[e.target.name] = e.target.value
        setShippingAddress(copy)
    }

    function updateWithValidatedAddress(obj){
        setShippingAddress({...shippingAddress, street: obj.address_line1, city: obj.city, state: obj.state, zipcode: obj.postcode, country: obj.country})
    }

    function selectSavedAddress(e){
        const address = addresses.find( a => a.id === parseInt(e.target.value))
        setShippingAddress(address)
    }

    function formatCart(){
        return cart?.map( i =>{
            return { order_qty: i.order_qty, product_id: i.product.id}
        })
    }

    function pushOrder(e){
        e.preventDefault()
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
        <form onSubmit={pushOrder} className='pt-[10vh] h-screen w-[80vw] pb-[15vh] flex flex-col max-w-[1050px]'>
    
            <div className='flex justify-between text-xs mt-3 items-center'>
                <button onClick={navigateToCart} type='button' className='text-left underline '>back to cart</button>
            </div>

            <div className='h-[10vh] flex w-full place-content-end items-center border-b px-5'>
                <p className='font-bold text-xl'>SUBTOTAL</p>
                <p className='text-xl'>${subtotal}</p>
            </div>

            <p className='underline text-left'>SHIPPING OPTIONS</p>
            <p className={`${!orderErrors && 'hidden'} error`}>{orderErrors?.errors?.shipping_detail && 'Shipping Address Error'} shipping address error</p>

            <ShippingAddressForm shippingAddress={shippingAddress} updateShippingInfo={updateShippingInfo} selectSavedAddress={selectSavedAddress} shippingInputIsOpen={shippingInputIsOpen} toggleShippingInput={toggleShippingInput} updateWithValidatedAddress={updateWithValidatedAddress}/>

            <div className='my-[5vh]'>
                <p className='underline text-left '>PAYMENT</p>
                <p className={`text-[8px] ${paymentAdded && 'hidden'}`}>*payment must be added before checking out</p>
            </div>

            <div className='grid '>
                <button type='button' onClick={()=>setPaymentAdded(true)} className={`bg-black text-white p-2 w-fit m-auto ${ paymentAdded && 'hidden'}`}>Add Payment Method</button>
                <p className={`text-xs font-bold text-[#243c5a] m-auto w-fit ${ !paymentAdded && 'hidden'}`}>payment method added</p>
            </div>


            <button className='bg-black text-white w-full p-2 mt-[5vh]'>SUBMIT ORDER</button>            

        </form> );
}

export default Checkout;

