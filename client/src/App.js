import './App.css';
import Signup from './Signup';
import { logoutSession, refreshSession } from './features/sessionSlice';
import Login from './login';
import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(refreshSession())
  }, [dispatch]);

  function logoutUser(){
    dispatch(logoutSession())
  }

  const user = useSelector(state => state.user)
  const session = useSelector(state => state.session)

  console.log(user, session)

  return (
    <div>
        <h1 className="text-3xl font-bold bg-slate-500 ">
          Hello world!
        </h1>

        <Signup />
        <Login />

        <button onClick={logoutUser}>logout</button>
    </div>

  );
}

export default App;
