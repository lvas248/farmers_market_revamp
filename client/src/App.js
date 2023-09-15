import './App.css';
import { useDispatch } from 'react-redux'
import { fetchProduct } from './redux/slices/productSlice';

import { useEffect } from 'react';
function App(){

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchProduct())
  },[])

  return (
    <div>

 
        

    </div>

  );
}

export default App;
