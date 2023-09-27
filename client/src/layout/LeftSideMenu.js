import { NavLink, useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logoutSession } from '../redux/slices/sessionSlice'
import { resetInventoryLevels } from '../redux/slices/productSlice'

function LeftSideMenu({isOpen, toggle}){

    const [ collectionIsOpen, setCollectionIsOpen ] = useState(false)
    const [ accountIsOpen, setAccountIsOpen ] = useState(false)
   
    const loggedIn = useSelector( state => state.session.loggedIn)

    const dispatch = useDispatch()
    const history = useHistory()

    function collectionToggle(){
        setCollectionIsOpen(!collectionIsOpen)
    }
    function accounToggle(){
        setAccountIsOpen(!accountIsOpen)
    }

    const renderCollectionNavs = ['SUMMER', 'SPRING', 'FALL', 'WINTER'].map( s =>{
        return <NavLink key={s} onClick={toggle} to={`/collection/${s.toLowerCase()}`}>{s}</NavLink>
    })

    function logout(){
        history.push('/')
        toggle()
        dispatch(logoutSession())
    }
    function resetInventory(){
        dispatch(resetInventoryLevels()).then(res => console.log(res))
    }

    return ( 
        <div
            className={`
                    leftPanel
                    transition-width duration-500 ease-out 
                    ${isOpen && 'w-[50vw] sm:w-[33vw]'}
                    `}
        >
            
            <div className={`
                ${!isOpen && 'hidden'} 
                animate-fade-in-slow
                pt-[8vh] pl-[5vw] grid gap-3 text-xs text-white `}>
               
                
                <NavLink onClick={toggle} className='' to={'/'}>SHOP ALL</NavLink>
               
                <button onClick={collectionToggle} className='text-left'>COLLECTIONS {collectionIsOpen ? '↑' : '↓' }</button>
                
                <div className={`flex flex-col px-2 gap-1 ${!collectionIsOpen && 'hidden'} animate-fade-in-fast`}>
                    {renderCollectionNavs}
                </div>
            
                <NavLink onClick={toggle} className='' to={'/about'}>ABOUT</NavLink>
                
                <button onClick={accounToggle} className='text-left'>ACCOUNT {accountIsOpen ? '↑' : '↓' }</button>

                <div className={`flex flex-col px-2 gap-1 ${!accountIsOpen && 'hidden'} animate-fade-in-fast`}>
                    { !loggedIn && <>
                        <NavLink onClick={toggle} className='' to={'/account/signup'}>SIGNUP</NavLink>
                        <NavLink onClick={toggle} className='' to={'/account/login'}>LOGIN</NavLink>
                    </>}

                
                    
                    { loggedIn && <>
                        <NavLink onClick={toggle} to='/account/my_orders'>MY ORDERS</NavLink>
                        <NavLink onClick={logout} className='' to={'#'}>LOGOUT</NavLink>
                    </>}

                </div>



                <button onClick={resetInventory} className='text-[8px] absolute bottom-5 right-5 underline'>RESET INVENTORY LEVELS</button>
            </div>

          
  
    
        </div> 
    );
}

export default LeftSideMenu;