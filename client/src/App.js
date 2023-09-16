import { useEffect, useState } from 'react';

import { Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchProduct } from './redux/slices/productSlice';
import { refreshSession } from './redux/slices/sessionSlice';

import Navbar from './layout/Navbar';
import Shop from './pages/shop/Shop';
import ProductDetailCard from './components/ProductDetailCard';
import Login from './pages/Login';

function App(){

  const [ leftIsOpen, setLeftisOpen ] = useState(false)
  const [ rightIsOpen, setRightisOpen ] = useState(false)

  function toggleLeft(){
    setLeftisOpen(!leftIsOpen)
    setRightisOpen(false)
  }
  function toggleRight(){
    setRightisOpen(!rightIsOpen)
    setLeftisOpen(false)
  }
  
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchProduct())
    dispatch(refreshSession())
  },[dispatch])


  return (
    <div className="relative min-w-[250px] h-screen bg-[#f7f7f7] grid place-content-center">   

    <Navbar leftIsOpen={leftIsOpen} rightIsOpen={rightIsOpen} toggleLeft={toggleLeft} toggleRight={toggleRight} />

      <Switch>


        <Route path='/product/:id'> <ProductDetailCard toggleRight={toggleRight}/> </Route>

        <Route path='/signup'> </Route>

        <Route path='/login'> <Login /></Route>

        <Route exact path='/'> <Shop /> </Route>

      </Switch>

    </div>

  );
}

export default App;
