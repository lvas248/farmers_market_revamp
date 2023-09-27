import { useSelector } from "react-redux";
import { useState } from 'react'
import ProductList from "../../components/ProductList";
import Filter from "../../components/Filter";
import LoadingIcon from '../../components/LoadingIcon'


function Shop(){

    const [ filterText, setFilterText ] = useState('')
    const [ produceType, setProduceType ] = useState('')

    function updateFilterText(e){
        setFilterText(e.target.value)
      }
  
    function updateProduceType(e){
      setProduceType (e.target.value)
    }

    const products = useSelector( state => state.product.entity)
    const productStatus = useSelector(state => state.product.status)

    const filteredProducts = products.filter( p => p.produce_type.includes(produceType) && p.name.toLowerCase().includes(filterText.toLowerCase()))

    return ( 
        <div className='pt-[6vh] h-[95vh] w-screen bg-white grid gap-2'>
            
            <Filter filterText={filterText} updateFilterText={updateFilterText} produceType={produceType} updateProduceType={updateProduceType}/>
            
            <h1 className='text-center text-sm sm:text-3xl'>SHOP ALL</h1>
        
            <ProductList productList={filteredProducts}/>

            {/* <LoadingIcon status={productStatus}/> */}
            
        </div>
     );
}

export default Shop;