
function ShippingAddressForm({shippingAddress, updateShippingAddress}) {

    return ( 
        <div className='flex flex-col px-5 py-3 gap-2'>

                <p className='font- text-lg'>SHIPPING ADDRESS</p>
                
                <input required  name='firstName' value={shippingAddress.firstName} onChange={updateShippingAddress} placeholder='First Name' className={`addressInput`} type='text' />
                
                <input required name='lastName' value={shippingAddress.lastName} onChange={updateShippingAddress} placeholder='Last Name' className={`addressInput `} type='text' />

                <input required name='addressLine1' value={shippingAddress.addresLine1} onChange={updateShippingAddress} placeholder='Address line 1' className={`addressInput`} type='text' />

                <input name='apartment' value={shippingAddress.apartment} onChange={updateShippingAddress} placeholder='Apartment' className={`addressInput`} type='text' />

                <input name='city' value={shippingAddress.city} onChange={updateShippingAddress} required placeholder='City' className={`addressInput`} type='text' />

                <input name='state' value={shippingAddress.state} onChange={updateShippingAddress} required placeholder='State' className={`addressInput`} type='state' />

                <input required name='zipcode' value={shippingAddress.zipcode} onChange={updateShippingAddress} placeholder='Zipcode' className={`addressInput`} type='number' />

                <input required name='phone' value={shippingAddress.phone} onChange={updateShippingAddress} placeholder='Phone' className={`addressInput `} type='text' />

        </div>
    );
}

export default ShippingAddressForm;