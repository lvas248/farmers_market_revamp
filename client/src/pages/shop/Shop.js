import { useSelector } from "react-redux";
import ProductList from "../../components/ProductList";

function Shop(){

    const allProduct = useSelector( state => state.product.entity)
    

    return ( 
        <div className='pt-[8vh] h-[92vh] w-screen'>
        
            <ProductList productList={allProduct}/>
            
        </div>
     );
}

export default Shop;