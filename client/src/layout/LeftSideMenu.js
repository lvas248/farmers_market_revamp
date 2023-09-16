import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logoutSession } from '../redux/slices/sessionSlice'

function LeftSideMenu({isOpen, toggle}){

    const [ collectionIsOpen, setCollectionIsOpen ] = useState(false)
    
    const loggedIn = useSelector( state => state.session.loggedIn)

    const dispatch = useDispatch()

    function collectionToggle(){
        setCollectionIsOpen(!collectionIsOpen)
    }

    const renderCollectionNavs = ['SUMMER', 'SPRING', 'FALL', 'WINTER'].map( s =>{
        return <NavLink key={s} onClick={toggle} to={`/collection/${s.toLowerCase()}`}>{s}</NavLink>
    })

    function logout(){
        dispatch(logoutSession())
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
                
                <button onClick={collectionToggle} className='text-left'>COLLECTIONS </button>
                
                <div className={`flex flex-col px-2 gap-1 ${!collectionIsOpen && 'hidden'} animate-fade-in-fast`}>
                    {renderCollectionNavs}
                </div>
            
                <NavLink onClick={toggle} className='' to={'/about'}>ABOUT</NavLink>
                
                { !loggedIn && <>
                    <NavLink onClick={toggle} className='' to={'/signup'}>SIGNUP</NavLink>
                    <NavLink onClick={toggle} className='' to={'/login'}>LOGIN</NavLink>
                </>}
                
                { loggedIn && <NavLink onClick={logout} className='' to={'#'}>LOGOUT</NavLink>}



                <button className='text-[8px] absolute bottom-5 right-5 underline'>RESET INVENTORY LEVELS</button>
            </div>

          
  
    
        </div> 
    );
}

export default LeftSideMenu;