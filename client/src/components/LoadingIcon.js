import loadingIcon from '../assets/Icons/icons8-loading-100.png'
import { useSelector } from 'react-redux';

function LoadingIcon() {

    const cartStatus = useSelector( state => state.cart.status)
    const orderStatus = useSelector( state => state.order.status)
    const productStatus = useSelector( state => state.product.status)

    const display =  (orderStatus === 'pending' || cartStatus === 'pending' || productStatus === 'pending')

    return ( 
        <div className={`${ !display && 'hidden'} absolute top-0 h-[100vh] w-[100vw] grid place-content-center`}>
            <img className='h-[50px] animate-spin z-50' alt='laodingIcon' src={loadingIcon} />
            <div className='absolute top-0 bg-black h-[100vh] w-[100vw] opacity-30'></div>
        </div>
    );
}

export default LoadingIcon;