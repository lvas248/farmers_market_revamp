import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginuser } from '../redux/slices/sessionSlice'
import { useHistory } from 'react-router-dom'

function Login() {

    const [ loginObj, setLoginObj ] = useState({
        email: '',
        password: ''
    })
    const dispatch = useDispatch()
    const history = useHistory()

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
                        <label className='text-sm'>Email</label>
                        <input className='border-2 text-md' name='email' value={loginObj.email} onChange={updateLoginObj} type='email' />
                    </div>

                    <div className='grid gap-2'>
                        <label className='text-sm'>Password</label>
                        <input className='border-2 text-md' name='password' type='password' value={loginObj.password} onChange={updateLoginObj} />
                    </div>

                    <button className='bg-black text-white text-xs h-[35px]'>Login</button>

                </form>


            </div>

     );
}

export default Login;