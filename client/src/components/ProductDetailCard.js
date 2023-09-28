import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux' 
import { useState } from 'react'
import { addToCart } from '../redux/slices/cartSlice'
import plus from '../assets/Icons/icons8-plus-100.png'
import minus from '../assets/Icons/icons8-minus-100.png'

function ProductDetailCard(){

    const [ qty, setQty ] = useState(0)

    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const error = useSelector( state => state.cart.error)
    const products = useSelector(state => state.product.entity)
    const cart = useSelector( state => state.cart.entity)
   
    const product = products?.find( p => p.id === parseInt(id))

    const productInCart = cart?.find(p => p.product?.id === product?.id)
    const availableQuantity = product?.qty_avail - (productInCart?.order_qty || 0) || 0 
   
    function incrementOrderQty(){
        if(qty < availableQuantity) setQty(qty + 1)
    }
    function decrementOrderQty(){
        if(qty > 0 ) setQty(qty - 1)
    }
   
    function addProductToCart(){
        if(qty > 0 &&( qty <= ( product?.qty_avail - ( productInCart?.order_qty || 0)))){
            dispatch(addToCart({ product_id: product.id, order_qty: qty})).then( res => {
                if(res.meta.requestStatus === 'fulfilled'){ 
                        history.push('/cart')
                        setQty(0)
                    }
            })
        }  
    }

    return ( 
    
        <div
            className='max-w-[1050px] w-[100vw] m-auto'
        >
            <div className='
                w-full h-[50vh]
                '>

                <div
                    className='
                        mx-8
                        m-auto h-[100%] bg-stone-100 grid place-content-center drop-shadow-md
                        '
                >
                    <img 
                        className='max-h-[200px] object-cover' 
                        alt={product?.name} src={product?.image} />

                </div>


            </div>


            <div
                className='h-[10%] w-full text-[10px] sm:text-xs p-4'
            >
                <p className='error text-[9px] text-right'>{error?.errors?.order_qty}</p>
                <div className='flex flex-col justify-between p-2'>

                   <div className='flex flex-col justify-between'>
                        <p><strong>{product?.name}</strong> | {product?.description}</p>
                        <p>Seasons: {product?.season?.split(',').join(' | ')}</p>
                        <p>Qty avail: {availableQuantity}</p>
                    </div>  

                    <div className='flex justify-between' > 
                        <div>
                            <p> ${product?.price}</p>
                        </div>

                        { product?.qty_avail < 1 && <p className='error text-right'>sold out</p>}

                        { ( productInCart?.order_qty > 0 ) && ( availableQuantity === 0 )  ? (
                            <p className='error text-right'>all units in cart</p>
                        ):(
                            <div className={`flex gap-2 items-center place-content-end mr-5 ${product?.qty_avail === 0 && 'hidden'}`}>
                                
                                <button onClick={decrementOrderQty}>
                                    <img className='h-[20px] w-[20px]' alt='decrement' src={minus} />
                                </button>
                               
                               <p className='grid place-content-center text-xl'>{qty}</p>
                                
                                <button onClick={incrementOrderQty}>
                                    <img className='h-[20px] w-[20px]' alt='increment' src={plus} />
                                </button>

                            </div>                            
                        )}


                    </div>
                 
                </div>

                <button 
                    className='bg-black h-[4vh] text-white w-full'
                    onClick={addProductToCart}
                >add to cart</button>

            </div>

        </div> 
    );
}

export default ProductDetailCard;