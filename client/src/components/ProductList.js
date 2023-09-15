import ProductCard from "./ProductCard";

function ProductList({productList}) {

    
    const renderProduct = productList?.map( p =>{
        return <ProductCard key={p.id} product={p} />
      })

    return ( 
          <div className='
              grid grid-cols-2 lg:grid-cols-4 gap-2 overflow-y-auto pt-2
              '
          >
          { renderProduct}
        </div>

     );
}

export default ProductList;