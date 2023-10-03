import { Squash as Hamburger} from 'hamburger-react'
import LeftSideMenu from './LeftSideMenu';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react'
import { useSelector } from 'react-redux';

function Navbar(){

    const [ leftIsOpen, setLeftisOpen ] = useState(false)

    function toggleLeft(){
      setLeftisOpen(!leftIsOpen)
    }
    const cart= useSelector( state => state.cart.entity)


    return ( 
        <div id='nav'
            className='navbar'
        >
            <div className='my-auto z-40'>
                <Hamburger size={20} toggled={leftIsOpen} toggle={toggleLeft} color={leftIsOpen ? 'white' : 'black'}/>
            </div>

            
            <NavLink to='/' className='my-auto'>Farmer's Market</NavLink>
     
            <NavLink
                to='/cart' 
                className='w-fit p-4 grid place-content-center'>
                    <div className='relative flex justify-center items-center '>
                        <p className='absolute left-[50%] text-[8px]'>{cart?.filtered_cart_items?.length}</p>
                        <img className='h-[30px] my-auto' alt='cart' src='https://res.cloudinary.com/dfbe9u9zm/image/upload/v1694832739/cart_e7zbid.png' />
                    </div>
            </NavLink>

            <LeftSideMenu isOpen={leftIsOpen} toggle={toggleLeft} />

        </div>  
    );
}

export default Navbar;