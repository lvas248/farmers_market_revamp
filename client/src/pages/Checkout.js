import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react'
import { useHistory } from "react-router-dom";
import getSubtotal from "../helpers/subtotal";
import ShippingAddressForm from "../components/ShippingAddressForm";
import { submitOrder } from "../redux/slices/orderSlice";
function Checkout(){
    
    const cart = useSelector(state => state.cart.entity)
    const loggedIn = useSelector(state => state.session.loggedIn)
    const addresses = useSelector(state => state.address.entity)

    const [ shippingInputIsOpen, setShippingInputIsOpen ] = useState(false)


    const [ shippingAddress, setShippingAddress ] = useState({
        name: '',
        email: '',
        phone: '',
        address_attributes:{
            id:'',
            street: '',
            apartment: '',
            city: '',
            state: '',
            zipcode: '',
            phone: '',  
            country: ''          
        }
    })

    

    console.log(shippingAddress)


    const dispatch = useDispatch()
    const history = useHistory()
    const subtotal = getSubtotal(cart)

    const renderAddressOptions = addresses?.map( a =>{
        return <option key={a.id} value={a.id} className='flex gap-1'>
            {a.street}, {a.apartment}, {a.city}, {a.state} {a.zipcode} - {a.country}
        </option>
    })

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
    function toggleShippingInput(){
        setShippingInputIsOpen(!shippingInputIsOpen)
        setShippingAddress({...shippingAddress, address_attributes: {
            id:'',
            street: '',
            apartment: '',
            city: '',
            state: '',
            zipcode: '',
            phone: '',  
            country: ''          
        }})
    }
    function updateAddressInfo(e){
        setShippingAddress({...shippingAddress, address_attributes: {
            id:e.target.value,
            street: '',
            apartment: '',
            city: '',
            state: '',
            zipcode: '',
            phone: '',  
            country: ''          
            }
        })
    }

    function submitForm(e){
        e.preventDefault()
        dispatch(submitOrder({shipping_detail: shippingAddress})).then(res => {
            console.log(res)
            if(res.meta.requestStatus === 'fulfilled') history.push(`/checkout/order_confirmation/${res.payload.id}`)
        })
    }

    return ( 
        <div className='pt-[10vh] h-screen pb-[15vh] flex flex-col max-w-[1050px]'>
            
            <div className='flex justify-between text-xs mt-3 items-center'>
                <button type='button' className='text-left underline '>back to cart</button>
                <p className={`${loggedIn && 'hidden'}`}>Have an account? <span className='underline hover:cursor-pointer'>Login</span></p>
            </div>

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


            <div className={`flex flex-col border-b px-5 py-3 gap-2 ${shippingInputIsOpen && 'hidden'}`}>

                <p className='text-lg '>SELECT SHIPPING ADDRESS</p>

                <div className='flex gap-2'>
                    <select onChange={updateAddressInfo} value={shippingAddress.address_attributes.id} className='text-xs w-[85%] h-[5vh] text-center addressInput'>{[<option key='0' value=''>select</option>,...renderAddressOptions]}</select>
                    <button  className='text-xs underline'>select</button>
                </div>

                <button onClick={toggleShippingInput} type='button' className='text-xs underline w-fit'>or add an address</button>

            </div>

            <div className={`${!shippingInputIsOpen && 'hidden'}`}>

                <ShippingAddressForm shippingAddress={shippingAddress} updateShippingAddressinfo={updateShippingAddressinfo} />
                <button onClick={toggleShippingInput} type='button' className='text-xs underline w-fit px-5'>or select from my addresses</button>
            
            </div>




            <button onClick={submitForm} className='bg-black text-white font-bold p-4 mt-[5vh]'>PLACE ORDER</button>
            

        </div> );
}

export default Checkout;

