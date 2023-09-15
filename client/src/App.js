import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from './redux/slices/productSlice';
import { loginuser } from './redux/slices/sessionSlice';

import { useEffect } from 'react';
function App(){

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchProduct())
  },[dispatch])

  function login(){
    dispatch(loginuser({username: 'user', password: '123'}))
  }




  const cart = useSelector( state => state.cart)
  const session = useSelector( state => state.user)

  return (
    <div>

      <button onClick={login}>login</button>

 

    </div>

  );
}

export default App;
