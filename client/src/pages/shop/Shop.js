import { useSelector } from "react-redux";
import { useState } from 'react'
import ProductList from "../../components/ProductList";
import Filter from "../../components/Filter";

function Shop(){

    const [ filterText, setFilterText ] = useState('')
    const [ produceType, setProduceType ] = useState('')

    function updateFilterText(e){
        setFilterText(e.target.value)
      }
  
      function updateProduceType(e){
        setProduceType (e.target.value)
      }

    const filteredProduct = useSelector( state => state.product.entity.filter(  p => p.produce_type.includes(produceType) && p.name.toLowerCase().includes(filterText.toLowerCase())))


    return ( 
        <div className='pt-[8vh] h-[95vh] w-screen bg-white grid gap-5'>

            <Filter filterText={filterText} updateFilterText={updateFilterText} produceType={produceType} updateProduceType={updateProduceType}/>
            
            <h1 className='text-center text-3xl py-3'>SHOP ALL</h1>
        
            <ProductList productList={filteredProduct}/>
            
        </div>
     );
}

export default Shop;