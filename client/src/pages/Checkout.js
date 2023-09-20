import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react'
import { useHistory } from "react-router-dom";
import getSubtotal from "../helpers/subtotal";
import ShippingAddressForm from "../components/ShippingAddressForm";
import { submitOrder } from "../redux/slices/orderSlice";
function Checkout(){

    const [ shippingAddress, setShippingAddress ] = useState({
        name: '',
        email: '',
        phone: '',
        address_attributes:{
            street: '',
            apartment: '',
            city: '',
            state: '',
            zipcode: '',
            phone: '',  
            country: ''          
        }
    })

    const dispatch = useDispatch()
    const history = useHistory()

    const cart = useSelector(state => state.cart.entity)
    // const loggedIn = useSelector(state => state.session.loggedIn)
    // const user = useSelector(state => state.user.entity)

    const subtotal = getSubtotal(cart)

    function updateShippingUserInfo(e){
        console.log(e.target.value)
        const copy = {...shippingAddress}
        copy[e.target.name] = e.target.value
        setShippingAddress(copy)
    }
    function updateShippingAddressinfo(e){
        const copy = {...shippingAddress.address_attributes}
        copy[e.target.name] = e.target.value
        setShippingAddress({...shippingAddress, address_attributes: copy})
    }

    function submitForm(e){
        e.preventDefault()
        dispatch(submitOrder({shipping_detail: shippingAddress})).then(res => {
            console.log(res)
            if(res.meta.requestStatus === 'fulfilled') history.push(`/checkout/order_confirmation/${res.payload.id}`)
        })
    }

    return ( 
        <form onSubmit={submitForm} className='pt-[8vh] pb-[15vh] flex flex-col max-w-[1050px]'>
            
            <button type='button' className='text-left text-xs underline mt-3'>back to cart</button>

            <div className='h-[10vh] flex justify-between items-center border-b px-5'>
                <p className='font-bold text-xl'>SUBTOTAL</p>
                <p className='text-xl'>${subtotal}</p>
            </div>

            <div className=' flex flex-col border-b px-5 py-3 gap-2'>

                <p className='font- text-lg'>CONTACT</p>


                <div className='flex flex-col gap-2'>

                    <input name='name' value={shippingAddress.name} onChange={updateShippingUserInfo} className={`addressInput `}  placeholder='name' type='text' />
                    <input name='email' value={shippingAddress.email} onChange={updateShippingUserInfo} className={`addressInput `}  placeholder='email' type='email' />
                    <input required name='phone' value={shippingAddress.phone} onChange={updateShippingUserInfo} placeholder='Phone' className={`addressInput`} type='text' />
                
                </div>
                    

               
            </div>

            <div className='border-b pb-5'>

                <ShippingAddressForm shippingAddress={shippingAddress} updateShippingAddressinfo={updateShippingAddressinfo} />

            </div>

            <button className='bg-black text-white font-bold p-4'>PLACE ORDER</button>
            

        </form> );
}

export default Checkout;

