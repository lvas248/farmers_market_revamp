import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'

import formatDate from "../../helpers/formatDate";
import getSubtotal from "../../helpers/subtotal";

function MyOrders( ){




    const history = useHistory()

    const orders = useSelector(state => state.order.entity)

    function navigateTo(order_id){
        history.push(`/account/my_orders/${order_id}`)
    }
    
    const renderOrders = orders?.map( o => {

        return <button onClick={()=>navigateTo(o.id)} key={o.id} className='flex justify-between w-[90vw] max-w-[500px] text-[8px] p-5 border-2 bg-white rounded-lg'>
            
            <p>Order#:{o.id}</p>            
            <p>{formatDate(o?.created_at)}</p>
            <p>Qty: {o?.filtered_order_items?.length}</p>
            <p>${getSubtotal(o?.filtered_order_items)}</p>

        </button>
    })
 

    return ( 
        <div className='h-screen pt-[10vh] flex flex-col gap-5'>

            <h1 className='text-center text:sm sm:text-3xl'>ORDERS</h1>

            <div className='flex flex-col gap-1'>
                {renderOrders}
            </div>


        </div>
     );
}

export default MyOrders
