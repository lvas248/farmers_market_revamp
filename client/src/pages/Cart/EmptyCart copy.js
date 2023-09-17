import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function EmptyCart(){

    const history = useHistory()
    function navigateTo(){
        history.push('/')
    }

    return ( 
        <div className='pt-[10vh] px-5 flex flex-col gap-3 text-center'>
            <p>CART(0)</p>
            <p className='text-xs'>your cart is currently empty</p>
            <button onClick={navigateTo} className='text-xs m-auto w-fit underline'>keep shopping</button>
      </div>
     );
}

export default EmptyCart;