import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { signupUser } from './features/sessionSlice'

function Signup() {


    const dispatch = useDispatch()
    const errors = useSelector( state => state.session.error)

    const [ signupObj, setSignupObj ] = useState({
        email: '',
        password: '',
        password_confirmation: ''    
    })

    function updateSignupObj(e){
        const copy = {...signupObj}
        copy[e.target.name] = e.target.value
        setSignupObj(copy)
    }

    function submitSignup(e){
        e.preventDefault()
        dispatch(signupUser(signupObj))
    }

    

    
    return ( 
        <form>

            <input type='email' name='email' placeholder='email' value={signupObj.email} onChange={updateSignupObj}/>
            
            <p className='error'>{errors?.email}</p>

            <input type='password' name='password' placeholder='password' value={signupObj.password} onChange={updateSignupObj}/>
            
            <input type='password' name='password_confirmation' placeholder='password_confirmation' value={signupObj.password_confirmation} onChange={updateSignupObj}/>
            
            <p className='error'>{errors?.password_confirmation}</p>
            
            <button
                className='bg-slate-200'
                onClick={submitSignup}
            >sign up</button>
        
        </form>
     );
}

export default Signup;