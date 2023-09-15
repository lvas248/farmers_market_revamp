import { useEffect } from 'react';

import { Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchProduct } from './redux/slices/productSlice';
import { refreshSession } from './redux/slices/sessionSlice';
function App(){

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchProduct())
    dispatch(refreshSession())
  },[dispatch])

  return (
    <div>

      <Switch>

        <Route exact path='/'>
         
  
        </Route>

        
      </Switch>

    </div>

  );
}

export default App;
