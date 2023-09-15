import { useHistory } from 'react-router-dom'

function ProductCard({product}){

    const history = useHistory()

    function navigateTo(){
        history.push(`/product/${product.id}`)
    }

    return ( 
    <div
        className='flex flex-col h-[35vh] md:h-[40vh] cursor-pointer'
        onClick={navigateTo}
    >
        <div id='imageContainer'
            className='bg-stone-100 h-[86%] grid'
        >
            <img className='m-auto h-[55px]' alt={product.name} src={product.image} />
        </div>

        <div
            className='bg-white h-[14%] text-[10px] p-2 flex justify-between'
        >
            <div
                className='flex flex-col  '
            >           
                <p>{product.name}</p>
                <p>${product.price}</p>
            </div>

        </div>

    </div> );
}

export default ProductCard;