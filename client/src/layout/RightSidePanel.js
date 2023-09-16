import { useHistory } from 'react-router-dom'
import  { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import SideCartItem from '../components/SideCardItem'


function RightSidePanel({isOpen, toggle}){

    const history = useHistory()
    const cart = useSelector(state => state.cart.entity)

    const renderCartItems = cart?.map( i => {
        return <SideCartItem key={i.id} cartItem={i} />
    })
    

    function continueShopping(){
        toggle()
        history.push('/')
    }
    function checkout(){
        toggle()
        history.push('/cart')
    }
  

    return ( 
        <div
        className={`
            rightPanel
            transition-width duration-500 ease-out 
            ${isOpen && 'w-[60vw] sm:w-[33vw]'}
            `} >

                <button onClick={toggle} className='absolute top-5 right-3 text-2xl z-20'><img className='h-[34px]' alt='x' src='https://res.cloudinary.com/dfbe9u9zm/image/upload/v1694832453/icons8-x-100_1_gunedt.png' /></button>

                <div className={`
                    ${!isOpen && 'hidden'}
                    animate-fade-in-slow text-white
                    p-10
                `}>

                    <h1 className='mb-2 text-sm font-bold'>shopping cart</h1>
                        
                    <div className='p-2 grid gap-2 border-t-2 border-b-2'>
                        { renderCartItems?.length > 0 ? renderCartItems : <p className='text-center'>cart empty</p>}

                    </div>     

                    <div
                        className='p-5 flex flex-col text-left gap-4 '
                    >
                        <button onClick={continueShopping}>Continue Shopping</button>
                        <button onClick={checkout}>Check out</button>
                    </div>

                </div>


        </div> );
}

export default RightSidePanel;