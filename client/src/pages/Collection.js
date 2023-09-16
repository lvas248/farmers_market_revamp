import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useState } from 'react'
import Filter from '../components/Filter';
import ProductList from '../components/ProductList';

function Collection() {

    const { season } = useParams()

    const [ filterText, setFilterText ] = useState('')
    const [ produceType, setProduceType ] = useState('')

    const products = useSelector(state => state.product.entity).filter( p => p.season.includes(season) && p.produce_type.includes(produceType) && p.name.toLowerCase().includes(filterText.toLowerCase()))

    function updateFilterText(e){
      setFilterText(e.target.value)
    }

    function updateProduceType(e){
      setProduceType (e.target.value)
    }

    

    return ( 
    
      <div className='pt-[8vh] h-[95vh] w-screen bg-white grid gap-5'>

            <Filter filterText={filterText} updateFilterText={updateFilterText} produceType={produceType} updateProduceType={updateProduceType}/>

            <h1 className='text-center text-3xl py-3'>{season.toUpperCase()} COLLECTION</h1>
 
            <ProductList productList={products}/>

        </div>
    
    );
}

export default Collection;