import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { useState } from 'react'

function ShippingAddressForm({shippingAddress, updateShippingInfo, shippingInputIsOpen, toggleShippingInput, selectSavedAddress}) {


    const history = useHistory()
    const addresses = useSelector( state => state.address.entity )

    const [ addressSubmitted, setAddressSubmitted ] = useState(false)
    
    const renderAddressOptions = addresses?.map( a =>{
        return <option key={a.id} value={a.id} className='flex gap-1'>
            {a.street}, {a.apartment}, {a.city}, {a.state} {a.zipcode} - {a.country}
        </option>
    })

    function navigateTo(){
        history.push(`/checkout/payment`)
    }

    return ( 

        <div className='mx-auto w-[80vw] max-w-[1050px] flex flex-col '>

            <div className={`${addressSubmitted && 'hidden'}`}>
                <p className='underline text-center'>SELECT SHIPPING OPTIONS</p>

                <button onClick={toggleShippingInput} className='text-xs underline text-left'>{shippingInputIsOpen ? 'or select from previous addresses' : 'or add address'}</button>

                <div className={`${shippingInputIsOpen && 'hidden'} grid place-content-center`}>
                <p  className='text-lg text-center'>MY SAVED ADDRESSES</p> 

                <select className='p-4 m-auto text-center' name='id' value={shippingAddress.id} onChange={selectSavedAddress}>{[<option key={0} value='' >SELECT</option>, ...renderAddressOptions]}</select>
                </div>

                <div className={`${!shippingInputIsOpen && 'hidden'} flex flex-col mx-auto gap-2`}>

                    <p className='text-center'>ADD NEW SHIPPING INFO</p>

                    <input name='name' value={shippingAddress.name} onChange={updateShippingInfo} className={`addressInput `}  placeholder='name' type='text' />

                    <input name='email' value={shippingAddress.email} onChange={updateShippingInfo} className={`addressInput `}  placeholder='email' type='email' />

                    <input required name='phone' value={shippingAddress.phone} onChange={updateShippingInfo} placeholder='Phone' className={`addressInput`} type='text' />
                    
                    <input required name='street' value={shippingAddress.street} onChange={updateShippingInfo} placeholder='street' className={`addressInput`} type='text' />

                    <input name='apartment' value={shippingAddress.apartment} onChange={updateShippingInfo} placeholder='Apartment' className={`addressInput`} type='text' />

                    <input name='city' value={shippingAddress.city} onChange={updateShippingInfo} required placeholder='City' className={`addressInput`} type='text' />

                    <input name='state' value={shippingAddress.state} onChange={updateShippingInfo} required placeholder='State' className={`addressInput`} type='state' />

                    <input required name='zipcode' value={shippingAddress.zipcode} onChange={updateShippingInfo} placeholder='Zipcode' className={`addressInput`} type='number' />

                
                </div>
               
            </div>



           
            <button  onClick={()=>navigateTo('checkout/payment')} className={`mt-4 place-content-center border-2 h-[50px] bg-black text-white drop-shadow-sm`}>CONTINUE TO PAYMENT</button>
        </div>
    );
}

export default ShippingAddressForm;