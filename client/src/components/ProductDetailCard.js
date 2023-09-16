import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux' 
import { useState } from 'react'
import { addToCart } from '../redux/slices/cartSlice'

function ProductDetailCard({}){
    const [ qty, setQty ] = useState(0)

    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const products = useSelector(state => state.product?.entity)
    const cart = useSelector( state => state.cart.entity)
   
    const product = products?.find( p => p.id === parseInt(id))
    const productInCart = cart?.find(p => p.product?.id === product?.id)
    const availableQuantity = product?.qty_avail - (productInCart?.order_qty || 0) || 0 
   
    function updateQty(e){
        setQty(e.target.value)
    }

    function addProductToCart(){
        if(qty > 0 && qty <= product.qty_avail){
            dispatch(addToCart({product:{ product_id: product.id, order_qty: qty}})).then( res => {
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
                <div className='flex flex-col justify-between p-2'>

                   <div className='flex justify-between'>
                        <p><strong>{product?.name}</strong> | {product?.description}</p>
                        <p>Seasons: {product?.season?.split(',').join(' | ')}</p>
                    </div>  
                 
                        <p>Qty avail: {availableQuantity}</p>
                        <p> ${product?.price}</p>
        
                    <div className='flex gap-2 place-content-end mr-5'>
                        select qty
                        <input className='text-center w-10' type='number' value={qty} min={0} max={availableQuantity} onChange={updateQty}  />
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