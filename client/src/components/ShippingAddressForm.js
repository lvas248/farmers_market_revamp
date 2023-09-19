
function ShippingAddressForm({shippingAddress, updateShippingAddressinfo}) {

    return ( 
        <div className='flex flex-col px-5 py-3 gap-2'>

                <p className='font- text-lg'>SHIPPING ADDRESS</p>
                                
                <input required name='street' value={shippingAddress.address_attributes.street} onChange={updateShippingAddressinfo} placeholder='street' className={`addressInput`} type='text' />

                <input name='apartment' value={shippingAddress.address_attributes.apartment} onChange={updateShippingAddressinfo} placeholder='Apartment' className={`addressInput`} type='text' />

                <input name='city' value={shippingAddress.address_attributes.city} onChange={updateShippingAddressinfo} required placeholder='City' className={`addressInput`} type='text' />

                <input name='state' value={shippingAddress.address_attributes.state} onChange={updateShippingAddressinfo} required placeholder='State' className={`addressInput`} type='state' />

                <input required name='zipcode' value={shippingAddress.address_attributes.zipcode} onChange={updateShippingAddressinfo} placeholder='Zipcode' className={`addressInput`} type='number' />

        </div>
    );
}

export default ShippingAddressForm;