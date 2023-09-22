import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux' 
import { useState } from 'react'
import { addToCart } from '../redux/slices/cartSlice'

function ProductDetailCard(){

    const [ qty, setQty ] = useState(0)

    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const error = useSelector( state => state.cart.error)

    const products = useSelector(state => state.product.entity)
    const cart = useSelector( state => state.cart.entity)
   
    const product = products?.find( p => p.id === parseInt(id)
    )
    //debug product in cart
    const productInCart = cart?.find(p => p.product?.id === product?.id)
    const availableQuantity = product?.qty_avail - (productInCart?.order_qty || 0) || 0 
   
   

    function updateQty(e){
        setQty(e.target.value)
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
                w-full h-[78vh]
                '>

                <div
                    className='
                        mx-8
                        m-auto h-[100%] bg-stone-100 grid place-content-center drop-shadow-md
                        '
                >
                    <img 
                        className='h-[200px] ' 
                        alt={product?.name} src={product?.image} />

                </div>


            </div>


            <div
                className='h-[10%] w-full text-[10px] sm:text-xs p-4'
            >
                <p className='error text-[9px] text-right'>{error?.errors?.order_qty}</p>
                <div className='flex flex-col justify-between p-2'>

                   <div className='flex justify-between'>
                        <p><strong>{product?.name}</strong> | {product?.description}</p>
                        <p>Seasons: {product?.season?.split(',').join(' | ')}</p>
                    </div>  

                    <div className='grid grid-cols-2'> 
                        <div>
                            <p>Qty avail: {availableQuantity}</p>
                            {/* <p>Qty avail: {product?.qty_avail}</p> */}
                            <p> ${product?.price}</p>
                        </div>

                        { product?.qty_avail < 1 && <p className='error text-right'>sold out</p>}

                        { ( productInCart?.order_qty > 0 ) && ( availableQuantity === 0 )  ? (
                            <p className='error text-right'>all units in cart</p>
                        ):(
                            <div className='flex gap-2 items-center place-content-end mr-5'>
                                select qty
                                <input className='text-center w-10' type='number' value={qty} min={0} max={availableQuantity} onChange={updateQty}  />
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