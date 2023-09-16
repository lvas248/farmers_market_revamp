

function Filter({updateFilterText, filterText, updateProduceType, produceType}) {
    
    return ( 
        <div className='py-1'>
            <div className='sm:p-5  bg-white w-[100%] flex text-[9px] justify-between max-w-[1050px] m-auto'>
                    
                    <input type='text' value={filterText} onChange={updateFilterText} className='border-[2px]  px-4 text-sm' placeholder="search..."/>
                    
                    <div className='flex justify-between px-4 gap-3 place-content-center sm:text-sm'>
                        
                        <div className='flex gap-1 items-center'>
                            <label>both</label>
                            <input type='radio' name='both' value='' onChange={updateProduceType} checked={produceType === ''} className='border-2px h-2 sm:h-3 border-black'/>
                        </div>

                        <div className='flex gap-1 items-center'>
                            <label>fruit</label>
                            <input type='radio' name='fruit' value='fruit' onChange={updateProduceType} checked={produceType === 'fruit'} className='border-2px h-2 border-black'/>
                        </div>

                        <div className='flex gap-1 items-center'>
                            <label>veggie</label>
                            <input type='radio' name='veggie' value='veggie' onChange={updateProduceType} checked={produceType === 'veggie'} className='border-2px h-2 border-black'/>
                        </div>

                    </div>

                    
        </div>
        </div>
     );
}

export default Filter;