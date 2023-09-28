import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom"
import getSubtotal from "../helpers/subtotal";

function OrderConfirmation(){

    const history = useHistory()
    const { order_id } = useParams()
    const orders = useSelector(state => state.order.entity)
    const order = orders.find( o => {
        return o.id === parseInt(order_id)
    })
    const subtotal = getSubtotal(order?.filtered_order_items)

    const renderOrderItems = order?.filtered_order_items?.map( i =>{
        return <div key={i?.id} className='text-xs text-left grid grid-cols-3 border-t-2 py-4'>                
                    <p>{i.product?.name}</p>
                    <p className=''>{i.product?.description}</p>
                    <p className='text-right'>x {i.order_qty}</p>
                </div>
    })

    function navigateHome(){
        history.push('/')
    }

    return ( 
        <div className='text-left flex flex-col gap-4 px-5 animate-glide-in-top'>

            <h3 className='font-bold text-center mb-[5vh]'>Confirmation Number: {order?.id}</h3>
            
            <div
                className='grid grid-cols-2 gap-6'
            >        

                <div className='text-left text-xs'>               
                    <p className='underline'>CONTACT:</p>
                    <p>{order?.shipping_detail?.name}</p>
                    <p>{order?.shipping_detail?.phone}</p>
                    <p>{order?.shipping_detail?.email}</p>
                </div> 

                <div className='text-left text-xs'>               
                    <p className='underline'>SHIPPING:</p>
                    <p>{order?.shipping_detail?.street}</p>              
                    <p>{order?.shipping_detail?.apartment}</p> 
                    <div className='flex gap-1'>
                        <p>{order?.shipping_detail?.city}</p>              
                        <p>{order?.shipping_detail?.zipcode}</p>
                         <p>{order?.shipping_detail?.state}</p>              
                    </div>
                    <p>{order?.shipping_detail?.country}</p>              
                </div>

            </div>

            <div className='flex flex-col gap-3'>
                {renderOrderItems}
            </div>

            <p className='text-center mt-[5vh]'>Subtotal: ${subtotal}</p>


            <button onClick={navigateHome} className='text-center text-xs underline mt-[5vh]'>continue shopping</button>

        </div> 
    );
}

export default OrderConfirmation;