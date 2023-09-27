import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import formatDate from "../../helpers/formatDate";
import getSubtotal from "../../helpers/subtotal";

function OrderDetails() {

    const history = useHistory()
    const { order_id } = useParams()
    const orders = useSelector(state => state.order.entity)
    const order = orders.find( o => o.id === parseInt(order_id))

    const renderOrderItems = order?.filtered_order_items.map( o =>{
        return <div key={o.id} className='grid grid-cols-3 text-xs p-3 border-t-2 font-medium'>
            <p className='text-center'>{o.product.name}</p>
            <p className=' text-center font-light'>{o.product.description}</p>
            <p className='text-center'>x {o.order_qty}</p>
        </div>
    }
    )

    function navigateTo(){
        history.push('/account/my_orders')
    }

    return ( 
    <div className='flex flex-col gap-6 h-screen pt-[10vh]'>
        <button onClick={navigateTo} className='text-left text-xs underline'>back to orders</button>

        <h1 className='text-center font-bold text:sm sm:text-3xl'>ORDER DETAILS</h1>

    
        <div className='text-xs grid grid-cols-2'>
                <p className='text-center'>Order #: {order?.id}</p>            
                <p className='text-center'>{formatDate(order?.created_at)}</p>
         </div>
       
        <div className='flex justify-around'>

            <div className='text-xs '>
                    <p className='underline font-semibold'>Contact:</p>
                    <p>{order?.shipping_detail?.name}</p>
                    <p>{order?.shipping_detail?.phone}</p>
                    <p>{order?.shipping_detail?.email}</p>
            </div>

            <div className='text-xs'>

                    <p className='underline font-semibold'>Shipping Address: </p>

                    <div className='flex gap-1'>
                        <p>{order?.shipping_detail?.street}</p>
                        <p>{order?.hipping_detail?.apartment}</p>
                    </div>
                    <div className='flex gap-1'>
                        <p>{order?.shipping_detail?.city}</p>
                        <p>{order?.shipping_detail?.zipcode}</p>
                        <p>{order?.shipping_detail?.state}</p>
                    </div>                       
                     <p>{order?.shipping_detail?.country}</p>

            </div>

        </div>
        

        <div className='border-b-2 text-xs'>
            {renderOrderItems}
        </div>

        <p className='text-center'>Total: ${getSubtotal(order?.filtered_order_items)}</p>



    </div> 
    );
}

export default OrderDetails;