import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearCart } from "../../redux/slices/cartSlice";
import CheckoutItem from "../../components/CheckoutItem";
import getSubtotal from "../../helpers/subtotal";

function Cart() {

    const dispatch = useDispatch()
    const history = useHistory()
    const loggedIn = useSelector(state => state.session.loggedIn)

    const cart = useSelector(state => state.cart.entity)

    const subtotal = getSubtotal(cart)

    const renderCheckoutItems = cart?.map( i =>{
        return <CheckoutItem key={i.id} order_item={i} />
    })

    function emptyCart(){
        dispatch(clearCart())
    }
    function navigateTo(string){
        history.push(`/${string}`)
    }

    return ( 
        <div
            className='pt-[7vh] p-5 w-[100vw] max-w-[700px] m-auto min-h-screen animate-glide-in-right'
        >

            <div className='p-2 mt-4 min-h-[35vh] sm:h-[60vh] overflow-y-auto m-auto'>
                
                <button onClick={()=>navigateTo('')} className='text-xs underline my-4'>continue shopping</button>
                
                <div className='grid grid-cols-9 text-center mb-2'>
                    

                    <h3 className='col-span-5 text-left text-lg'>My Bag({cart?.length || 0})</h3>

                    <div className='col-span-4  grid-cols-3 text-xs text-stone-400 hidden sm:grid'>
                        <p className='col-span-1'>QUANTITY</p>
                        <p className='col-span-1'>PRICE</p>
                        <p className='col-span-1'>TOTAL</p>
                    </div>
                </div>

                { renderCheckoutItems}

                <button onClick={emptyCart} className='float-right text-xs underline'>clear cart</button>

            </div>


            <div className='w-[100%] border-t-4 flex flex-col max-w-[700px]'>
                
                <div className='flex justify-between text-xs px-2 py-3 border-b'>
                    <p className='text-stone-300'>SUBTOTAL:</p>
                    <p>${(Math.round(subtotal * 100)/100).toFixed(2)}</p>
                </div>

                <div className='flex justify-between text-xs px-2 py-3 border-b'>
                    <p className='text-stone-300'>SHIPPING:</p>

                </div> 

                <button onClick={()=>navigateTo('checkout/shipping_info')} className={`mt-4 place-content-center border-2 h-[50px] bg-black text-white drop-shadow-sm`}>{ loggedIn ? 'CHECKOUT' : 'CHECKOUT AS GUEST'}</button>
                            
                <button onClick={()=>navigateTo('account/login')} className={` ${loggedIn && 'hidden'} mt-4 place-content-center border-2 h-[50px] bg-black text-white drop-shadow-sm`}>SIGN IN</button>

               

            </div>
            


        </div>
     );
}

export default Cart;