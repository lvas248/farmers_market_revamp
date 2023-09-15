import x from '../Assets/Icons/x.png'

function RightSidePanel({isOpen, toggle}){

    return ( 
        <div
        className={`
            rightPanel
            transition-width duration-500 ease-out 
            ${isOpen && 'w-[50vw] sm:w-[33vw]'}
            `} >

                <button onClick={toggle} className='absolute top-5 right-3 text-2xl animate-rotate-in'><img className='h-[35px]' alt='x' src={x} /></button>



        </div> );
}

export default RightSidePanel;