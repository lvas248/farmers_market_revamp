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



  
  return (
    <div>


    </div>

  );
}

export default App;
