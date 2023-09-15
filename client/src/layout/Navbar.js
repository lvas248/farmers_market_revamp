import { Squash as Hamburger} from 'hamburger-react'
import cart from '../assets/Icons/cart.png'
// import filled_cart from '../Assets/Icons/filled_cart.png'
import LeftSideMenu from './LeftSideMenu';
import RightSidePanel from './RightSidePanel';

function Navbar({leftIsOpen, rightIsOpen, toggleLeft, toggleRight}){
    

    return ( 
        <div id='nav'
            className='navbar'
        >
            <div className='my-auto z-40'>
                <Hamburger size={20} toggled={leftIsOpen} toggle={toggleLeft} color={leftIsOpen ? 'white' : 'black'}/>
            </div>

            
            <h1 className='my-auto'>Farmers Market</h1>
     
            <button 
                onClick={toggleRight} 
                className='w-fit p-4'>
                <img className='h-[30px] my-auto' alt='cart' src={cart} />
            </button>

            <LeftSideMenu isOpen={leftIsOpen} toggle={toggleLeft} />
            <RightSidePanel isOpen={rightIsOpen} toggle={toggleRight} />

        </div>  
    );
}

export default Navbar;