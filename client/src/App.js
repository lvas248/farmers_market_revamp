import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from './redux/slices/productSlice';
import { addToCart, updateOrderItem } from './redux/slices/cartSlice';
import { loginuser, refreshSession } from './redux/slices/sessionSlice';

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
    dispatch(addToCart({product: { product_id: 5, order_qty:1}})).then(res => console.log(res.payload))
  }





  const cart = useSelector( state => state.cart)
  const loggedIn = useSelector( state => state.session.loggedIn)

  console.log('cart:',cart)
  return (
    <div>

      <div className={`h-[10vh] w-full ${loggedIn && 'bg-green-400'}`}></div>
    

      <button onClick={login}>login</button>
      <button onClick={addItemToCart}>add to cart</button>

 

    </div>

  );
}

export default App;
