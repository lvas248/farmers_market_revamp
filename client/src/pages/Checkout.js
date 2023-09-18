import { useSelector } from "react-redux";
import { useState } from 'react'
import getSubtotal from "../helpers/subtotal";
import ShippingAddressForm from "../components/ShippingAddressForm";

function Checkout(){

    const [ shippingAddress, setShippingAddress ] = useState({
        firstName: '',
        lastName: '',
        addressLine1: '',
        apartment: '',
        city: '',
        state: '',
        zipcode: '',
        phone: ''
    })

    const [ saveInfo, setSaveInfo ] = useState(false)

    function toggleSaveInfo(){
        setSaveInfo(!saveInfo)
    }

    console.log(saveInfo)

    const cart = useSelector(state => state.cart.entity)
    const loggedIn = useSelector(state => state.session.loggedIn)
    const subtotal = getSubtotal(cart)

    function updateShippingAddress(e){
        const copy = {...shippingAddress}
        copy[e.target.name] = e.target.value
        setShippingAddress(copy)
    }

    return ( 
        <form className='pt-[8vh] pb-[15vh] flex flex-col max-w-[1050px]'>

            <div className='h-[10vh] flex justify-between items-center border-b px-5'>
                <p className='font-bold text-xl'>SUBTOTAL</p>
                <p className='text-xl'>${subtotal}</p>
            </div>

            <div className='h-[12vh] flex flex-col border-b px-5 py-3 gap-2'>

                <p className='font- text-lg'>CONTACT</p>

                <div className='flex flex-col '>
                    

                    <input className={`text-xs p-3 ${loggedIn && 'hidden'}`}  placeholder='email' type='email' />

                    <p className={`${!loggedIn && 'hidden'}`}>EMAIL ADDRESS</p>

                </div>

            </div>

            <div className='border-b pb-5'>

                <ShippingAddressForm shippingAddress={shippingAddress} updateShippingAddress={updateShippingAddress}/>
 
                <div className='flex gap-1 items-center'>
                    <input type='checkbox' onClick={toggleSaveInfo} />
                    <label className='text-xs'>save info for next time</label>
                </div>

            </div>

            <button className='bg-black text-white font-bold p-4'>PLACE ORDER</button>
            

        </form> );
}

export default Checkout;

