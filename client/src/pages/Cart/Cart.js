import { useSelector } from "react-redux";
import CheckoutItem from "./CheckoutItem";

function Cart() {

    const cart = useSelector(state => state.cart.entity)

    const subtotal = cart?.reduce((acc, order_item) =>{
        return acc + order_item.product.price * order_item.order_qty
    }, 0)

    const renderCheckoutItems = cart?.map( i =>{
        return <CheckoutItem key={i.id} order_item={i} />
    })

    return ( 
        <div
            className='pt-[7vh] p-5 w-[100vw] max-w-[700px] m-auto min-h-screen animate-glide-in-right'
        >

            <div className='p-2 mt-4 h-[65vh] sm:h-[73vh] overflow-y-auto m-auto'>

                <div className='grid grid-cols-9 text-center mb-2'>

                    <h3 className='col-span-5 text-left text-lg'>My Bag({cart?.length || 0})</h3>
                    <div className='col-span-4  grid-cols-3 text-xs text-stone-400 hidden sm:grid'>
                        <p className='col-span-1'>QUANTITY</p>
                        <p className='col-span-1'>PRICE</p>
                        <p className='col-span-1'>TOTAL</p>
                    </div>
                </div>

                { renderCheckoutItems}

            </div>


            <div className='w-[100%] border-t-4 flex flex-col max-w-[700px]'>
                
                <div className='flex justify-between text-xs px-2 py-3 border-b'>
                    <p className='text-stone-300'>SUBTOTAL:</p>
                    <p>${(Math.round(subtotal * 100)/100).toFixed(2)}</p>
                </div>

                <div className='flex justify-between text-xs px-2 py-3 border-b'>
                    <p className='text-stone-300'>SHIPPING:</p>
                    <p className='text-[8px]'>FREE SHIPPING ON ORDER OVER $100</p>

                </div> 

                <button className='mt-4 place-content-center border-2 h-[50px] bg-black text-white drop-shadow-sm'>CHECKOUT</button>

            </div>
            



        </div>
     );
}

export default Cart;