import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react'
import { useHistory } from "react-router-dom";
import getSubtotal from "../../helpers/subtotal";
import ShippingAddressForm from "./ShippingAddressForm";
import { submitOrder } from "../../redux/slices/orderSlice";
import { Switch, Route } from "react-router-dom";
import Payment from "./Payment";
function Checkout(){
    
    const cart = useSelector(state => state.cart.entity)
    const addresses = useSelector( state => state.address.entity)
    const loggedIn = useSelector(state => state.session.loggedIn)

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
    const [ paid, setPaid ] = useState(false)

    const [ shippingInputIsOpen, setShippingInputIsOpen ] = useState(false)

    const dispatch = useDispatch()
    const history = useHistory()
    const subtotal = getSubtotal(cart)

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

    function selectSavedAddress(e){
        const address = addresses.find( a => a.id === parseInt(e.target.value))
        setShippingAddress(address)
    }


   


    // function submitForm(e){
    //     e.preventDefault()
    //     dispatch(submitOrder(shippingAddress)).then(res => {
    //         console.log(res)
    //         if(res.meta.requestStatus === 'fulfilled') history.push(`/checkout/order_confirmation/${res.payload.id}`)
    //     })
    // }

    return ( 
        <div className='pt-[10vh] h-screen w-[80vw] pb-[15vh] flex flex-col max-w-[1050px]'>
    
            <div className='flex justify-between text-xs mt-3 items-center'>
                <button type='button' className='text-left underline '>back to cart</button>
            </div>

            <div className='h-[10vh] flex w-full place-content-end items-center border-b px-5'>
                <p className='font-bold text-xl'>SUBTOTAL</p>
                <p className='text-xl'>${subtotal}</p>
            </div>

            <Switch>
                <Route exact path='/checkout/payment'> <Payment shippingAddress={shippingAddress}/> </Route>

                <Route path='/checkout/shipping_info'> <ShippingAddressForm shippingAddress={shippingAddress} updateShippingInfo={updateShippingInfo} selectSavedAddress={selectSavedAddress} shippingInputIsOpen={shippingInputIsOpen} toggleShippingInput={toggleShippingInput}/> </Route>
                
            
            </Switch>






   




            {/* <button onClick={submitForm} className='bg-black text-white font-bold p-4 mt-[5vh]'>PLACE ORDER</button> */}
            

        </div> );
}

export default Checkout;

