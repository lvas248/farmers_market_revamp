import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import getSubtotal from "../helpers/subtotal";

function OrderInfo(){

    const { order_id } = useParams()
    const orders = useSelector(state => state.order.entity)
    const order = orders.find( o => {
        return o.id === parseInt(order_id)
    })
    const subtotal = getSubtotal(order?.order_items)

    const renderOrderItems = order?.order_items?.map( i =>{
        return <div key={i?.id} className='text-xs text-left grid grid-cols-3 border-t-2 py-4'>                
                    <p>{i.product?.name}</p>
                    <p className=''>{i.product?.description}</p>
                    <p className='text-right'>x {i.order_qty}</p>
                </div>
    })

    return ( 
        <div className='text-left flex flex-col gap-4'>

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
                    <p>{order?.shipping_detail?.address?.street}</p>              
                    <p>{order?.shipping_detail?.address?.apartment}</p> 
                    <div className='flex gap-1'>
                        <p>{order?.shipping_detail?.address?.city}</p>              
                        <p>{order?.shipping_detail?.address?.zipcode}</p>
                         <p>{order?.shipping_detail?.address?.state}</p>              
                    </div>
                    <p>{order?.shipping_detail?.address?.country}</p>              
                </div>

            </div>

            <div className='flex flex-col gap-3'>
                {renderOrderItems}
            </div>

            <p className='text-center mt-[5vh]'>Subtotal: ${subtotal}</p>

        </div> 
    );
}

export default OrderInfo;