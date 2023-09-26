import { useEffect } from 'react';

import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from './redux/slices/productSlice';
import { refreshSession } from './redux/slices/sessionSlice';

import Navbar from './layout/Navbar';
import Shop from './pages/shop/Shop';
import ProductDetailCard from './components/ProductDetailCard';
import Login from './pages/account/Login';
import Signup from './pages/account/Signup';
import Collection from './pages/Collection';
import Cart from './pages/Cart/Cart'
import EmptyCart from './pages/Cart/EmptyCart';
import Checkout from './pages/checkout/Checkout';
import MyOrders from './pages/account/MyOrders';
import OrderConfirmation from './components/OrderConfirmation';
import OrderDetails from './pages/account/OrderDetails';
import { validateAddress } from './redux/slices/addressSlice';

function App(){

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchProduct())
  },[dispatch])

  useEffect(()=>{
    dispatch(refreshSession())
  },[dispatch])

  const user = useSelector(state => state.user.entity)
  const cart = useSelector(state => state.cart.entity)
  const addresses = useSelector(state => state.address.entity)


  console.log('addresses: ',addresses, 'cart: ', cart, 'user: ', user)
  
  return (
    <div className="relative min-w-[250px] bg-[#f7f7f7] grid place-content-center min-h-screen">   

    <Navbar />

      <Switch>

        
        <Route exact path='/'> <Shop /> </Route>

        <Route path='/product/:id'> <ProductDetailCard /> </Route>

        <Route path='/collection/:season'> <Collection /></Route>

        <Route path='/cart'>{ cart?.length > 0 ? <Cart /> : <EmptyCart /> }</Route>

        <Route path='/checkout'><Checkout /></Route>



        <Route path='/account'>

          <Route path='/account/my_orders/:order_id'> <OrderDetails /> </Route>
          <Route exact path='/account/my_orders'> <MyOrders />  </Route>
         
          <Route exact path='/account/signup'> <Signup /> </Route>
          <Route exact path='/account/login'> <Login /> </Route>

        </Route>


      </Switch>

    </div>

  );
}

export default App;
