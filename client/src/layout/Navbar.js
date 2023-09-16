import { Squash as Hamburger} from 'hamburger-react'
import LeftSideMenu from './LeftSideMenu';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react'

function Navbar(){

    const [ leftIsOpen, setLeftisOpen ] = useState(false)

    function toggleLeft(){
      setLeftisOpen(!leftIsOpen)
    }

    return ( 
        <div id='nav'
            className='navbar'
        >
            <div className='my-auto z-40'>
                <Hamburger size={20} toggled={leftIsOpen} toggle={toggleLeft} color={leftIsOpen ? 'white' : 'black'}/>
            </div>

            
            <h1 className='my-auto'>Farmers Market</h1>
     
            <NavLink
                to='/cart' 
                className='w-fit p-4 grid place-content-center'>
                <img className='h-[30px] my-auto' alt='cart' src='https://res.cloudinary.com/dfbe9u9zm/image/upload/v1694832739/cart_e7zbid.png' />
            </NavLink>

            <LeftSideMenu isOpen={leftIsOpen} toggle={toggleLeft} />

        </div>  
    );
}

export default Navbar;