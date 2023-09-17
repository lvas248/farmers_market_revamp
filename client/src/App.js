import { useEffect, useState } from 'react';

import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from './redux/slices/productSlice';
import { refreshSession } from './redux/slices/sessionSlice';

import Navbar from './layout/Navbar';
import Shop from './pages/shop/Shop';
import ProductDetailCard from './components/ProductDetailCard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Collection from './pages/Collection';
import Cart from './pages/Cart/Cart'
import EmptyCart from './pages/Cart/EmptyCart';

function App(){

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchProduct())
    dispatch(refreshSession())
  },[dispatch])

  const cart = useSelector(state => state.cart.entity)

  return (
    <div className="relative min-w-[250px] bg-[#f7f7f7] grid place-content-center min-h-screen">   

    <Navbar />

      <Switch>

        
        <Route exact path='/'> <Shop /> </Route>

        <Route path='/product/:id'> <ProductDetailCard /> </Route>

        <Route path='/collection/:season'> <Collection /></Route>

        <Route path='/cart'>
          { cart?.length > 0 ? <Cart /> : <EmptyCart /> }
        </Route>

        <Route path='/signup'><Signup /> </Route>

        <Route path='/login'> <Login /></Route>


      </Switch>

    </div>

  );
}

export default App;
