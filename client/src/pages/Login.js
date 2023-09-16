import { useState , useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginuser, removeErrors } from '../redux/slices/sessionSlice'
import { useHistory } from 'react-router-dom'

function Login() {

    const [ loginObj, setLoginObj ] = useState({
        email: '',
        password: ''
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

    function updateLoginObj(e){
        const copy = {...loginObj}
        copy[e.target.name] = e.target.value
        setLoginObj(copy)
    }

    function login(e){
        e.preventDefault()
        dispatch(loginuser(loginObj)).then(res => {
            if(res.meta.requestStatus === 'fulfilled') history.push('/')
        })
    }

    return ( 

            <div className='bg-white w-[80vw] text-black p-8 border-2 flex flex-col max-w-[410px]'>
                
                <h1 className='text-xl'>LOGIN</h1>

                <form onSubmit={login} className='grid pt-6 gap-3' >

                    <div className='grid gap-2'>
                        <div className='flex justify-between'>
                            <label className='text-sm'>Email</label>
                            <p className='error'>{error?.error && error?.error}</p>
                        </div>                        
                        <input className='border-2 text-md px-1' name='email' value={loginObj.email} onChange={updateLoginObj} type='email' />
                    </div>

                    <div className='grid gap-2'>
                        <label className='text-sm'>Password</label>
                        <input className='border-2 text-md px-1' name='password' type='password' value={loginObj.password} onChange={updateLoginObj} />
                    </div>

                    <button className='bg-black text-white text-xs h-[35px]'>Login</button>

                </form>


            </div>

     );
}

export default Login;