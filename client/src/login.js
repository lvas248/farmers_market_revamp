import {  useState } from 'react'
import { loginuser } from './features/sessionSlice'
import { useDispatch, useSelector } from 'react-redux'

function Login() {

    const dispatch = useDispatch()
    const errors = useSelector( state => state.session.error)


  

    const [ loginObj, setLoginObj ] = useState({
        email: '',
        password: ''
    })

    function updateLoginObj(e){
        const copy = {...loginObj}
        copy[e.target.name] = e.target.value
        setLoginObj(copy)
    }

    function submitLoginObj(e){
        e.preventDefault()
        dispatch(loginuser(loginObj))
    }


    return ( 
            <form onSubmit={submitLoginObj}>
                
                <input type='text' placeholder='email' name='email' value={loginObj.username} onChange={updateLoginObj}  />
               
                <input type='password' placeholder='password' name='password' value={loginObj.password} onChange={updateLoginObj}  />
            
                <p className='error'>{errors?.error}</p>

                <button className='bg-slate-200'>login</button>
            </form> 
        );
}

export default Login;