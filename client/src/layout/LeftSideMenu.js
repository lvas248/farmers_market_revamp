import { NavLink } from 'react-router-dom'
import { useState } from 'react'

function LeftSideMenu({isOpen, toggle}){

    const [ collectionIsOpen, setCollectionIsOpen ] = useState(false)
    
    function collectionToggle(){
        setCollectionIsOpen(!collectionIsOpen)
    }

    const renderCollectionNavs = ['SUMMER', 'SPRING', 'FALL', 'WINTER'].map( s =>{
        return <NavLink key={s} onClick={toggle} to={`/collection/${s.toLowerCase()}`}>{s}</NavLink>

    })

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
                pt-[8vh] pl-[5vw] grid gap-3 text-xs text-white`}>
               
                <NavLink onClick={toggle} className='' to={'/'}>SHOP ALL</NavLink>
                
                <button onClick={collectionToggle} className='text-left'>COLLECTIONS </button>
                <div className={`flex flex-col px-2 gap-1 ${!collectionIsOpen && 'hidden'} animate-fade-in-fast`}>
                    {renderCollectionNavs}
                </div>
               
                <NavLink onClick={toggle} className='' to={'/ABOUT'}>ABOUT</NavLink>
                
                <NavLink onClick={toggle} className='' to={'/ACCOUNT'}>ACCOUNT</NavLink>

            </div>
  
    
        </div> 
    );
}

export default LeftSideMenu;