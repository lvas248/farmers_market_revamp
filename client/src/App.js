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

  const user = useSelector(state => state.user.entity)
  console.log(user)


  return (
    <div className="relative min-w-[250px] bg-[#f7f7f7] grid place-content-center min-h-screen">   

    <Navbar leftIsOpen={leftIsOpen} rightIsOpen={rightIsOpen} toggleLeft={toggleLeft} toggleRight={toggleRight} />

      <Switch>

        
        <Route exact path='/'> <Shop /> </Route>

        <Route path='/product/:id'> <ProductDetailCard toggleRight={toggleRight}/> </Route>

        <Route path='/collection/:season'> <Collection /></Route>

        <Route path='/signup'><Signup /> </Route>

        <Route path='/login'> <Login /></Route>


      </Switch>

    </div>

  );
}

export default App;
