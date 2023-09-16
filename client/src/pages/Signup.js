import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signupUser } from '../redux/slices/sessionSlice'
import { useHistory } from 'react-router-dom'

function Signup() {

    const [ signupObj, setSignupObj ] = useState({
        email: '',
        password: '',
        password_confirmation: ''
    })
    const dispatch = useDispatch()
    const history = useHistory()

    function updateSignupObj(e){
        const copy = {...signupObj}
        copy[e.target.name] = e.target.value
        setSignupObj(copy)
    }

    function signup(e){
        e.preventDefault()
        dispatch(signupUser(signupObj)).then(res => {
            if(res.meta.requestStatus === 'fulfilled') history.push('/')
        })
        
    }


    return ( 

            <div className='bg-white w-[80vw] text-black p-8 border-2 flex flex-col max-w-[410px]'>
                
                <h1 className='text-xl'>REGISTER</h1>

                <form onSubmit={signup} className='grid pt-6 gap-3' >

                    <div className='grid gap-2'>
                        <label className='text-sm'>Email</label>
                        <input className='border-2 text-md' name='email' value={signupObj.email} onChange={updateSignupObj} type='email' />
                    </div>

                    <div className='grid gap-2'>
                        <label className='text-sm'>Password</label>
                        <input className='border-2 text-md' name='password' type='password' value={signupObj.password} onChange={updateSignupObj} />
                    </div>

                    <div className='grid gap-2'>
                        <label className='text-sm'>Confirm Password</label>
                        <input className='border-2 text-md' name='password_confirmation' type='password' value={signupObj.password_confirmation} onChange={updateSignupObj} />
                    </div>

                    <button className='bg-black text-white text-xs h-[35px]'>Sign Up</button>

                </form>


            </div>

     );
}

export default Signup;