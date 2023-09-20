import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signupUser, removeErrors } from '../../redux/slices/sessionSlice'
import { useHistory } from 'react-router-dom'

function Signup() {

    const [ signupObj, setSignupObj ] = useState({
        email: '',
        password: '',
        password_confirmation: ''
    })
    const dispatch = useDispatch()
    const history = useHistory()
    const error = useSelector(state => state.session.error)

    useEffect(()=>{
        //removes errors when component unmounts
        return()=>{
            dispatch(removeErrors())
        }
    },[dispatch])

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
                        <div className='flex justify-between'>
                            <label className='text-sm'>Email</label>
                            <p className='error'>{error?.email && error?.email}</p>
                        </div>
                        <input className='border-2 text-md px-1' name='email' value={signupObj.email} onChange={updateSignupObj} type='email' />
                    </div>

                    <div className='grid gap-2'>
                        <div className='flex justify-between'>
                            <label className='text-sm'>Password</label>
                            <p className='error'>{error?.password && error?.password}</p>
                        </div>
                        <input className='border-2 text-md px-1' name='password' type='password' value={signupObj.password} onChange={updateSignupObj} />
                    </div>

                    <div className='grid gap-2'>
                        <div className='flex justify-between'>
                            <label className='text-sm'>Confirm Password</label>
                            <p className='error'>{error?.password_confirmation && error?.password_confirmation}</p>
                        </div>
                        <input className='border-2 text-md px-1' name='password_confirmation' type='password' value={signupObj.password_confirmation} onChange={updateSignupObj} />
                    </div>

                    <button className='bg-black text-white text-xs h-[35px]'>Sign Up</button>

                </form>


            </div>

     );
}

export default Signup;