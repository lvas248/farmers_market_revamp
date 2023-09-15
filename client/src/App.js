import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from './redux/slices/productSlice';
import { addToCart, clearCart } from './redux/slices/cartSlice';
import { loginuser, refreshSession } from './redux/slices/sessionSlice';
import { submitOrder } from './redux/slices/orderSlice';

import { useEffect } from 'react';
function App(){

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchProduct())
    dispatch(refreshSession())
  },[dispatch])

  function login(){
    dispatch(loginuser({username: 'user', password: '123'}))
  }

  function addItemToCart(){
    dispatch(addToCart({product: { product_id: 6, order_qty:4}})).then(res => console.log(res.payload))
  }

  function removeEverythingFromCart(){
    dispatch(clearCart())
  }

  function submitCart(){
    dispatch(submitOrder())
  }


  const cart = useSelector( state => state.cart)
  const loggedIn = useSelector( state => state.session.loggedIn)
  const orders = useSelector( state => state.order.entity)

  console.log('cart:',cart, 'order: ', orders)
  return (
    <div>

      <div className={`h-[10vh] w-full ${loggedIn && 'bg-green-400'}`}></div>
    

      <button onClick={login}>login</button>
      <button onClick={addItemToCart}>add to cart</button>



      <button onClick={submitCart}>submit order</button>

    </div>

  );
}

export default App;
