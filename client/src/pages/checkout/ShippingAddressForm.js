import { useSelector } from "react-redux";
import AddressValidator from "./AddressValidator";

function ShippingAddressForm({shippingAddress, updateShippingInfo, shippingInputIsOpen, toggleShippingInput, selectSavedAddress, updateWithValidatedAddress}) {


    const addresses = useSelector( state => state.address.entity )
    const loggedIn = useSelector( state => state.session.loggedIn )

    
    const renderAddressOptions = addresses?.map( a =>{
        return <option key={a.id} value={a.id} className='flex gap-1'>
            {a.name} - {a.street} {a.apartment}, {a.city}, {a.state} {a.zipcode}, {a.country}
        </option>
    })

    return ( 

        <div className='mx-auto w-[80vw] max-w-[1050px] flex flex-col border-b-2 py-[2vh]'>



                <div className={`${shippingInputIsOpen && 'hidden'} grid place-content-center p-5`}>
                    <p  className='text-lg text-center'>MY SAVED ADDRESSES</p> 

                    <select className='p-4 m-auto text-xs text-center w-[75%]' name='id' value={shippingAddress.id} onChange={selectSavedAddress}>{[<option key={0} value='' >SELECT</option>, ...renderAddressOptions]}</select>
                </div>

                <div className={`${!shippingInputIsOpen && 'hidden'} flex flex-col mx-auto gap-2`}>

                    <p className='text-center'>ADD NEW SHIPPING INFO</p>

                    <input required name='name' value={shippingAddress.name} onChange={updateShippingInfo} className={`addressInput `}  placeholder='name' type='text' />

                    <input required name='email' value={shippingAddress.email} onChange={updateShippingInfo} className={`addressInput `}  placeholder='email' type='email' />

                    <input required name='phone' value={shippingAddress.phone} onChange={updateShippingInfo} placeholder='Phone' className={`addressInput`} type='text' />
                    
                </div>

                <div className={`${!shippingInputIsOpen && 'hidden'}`}>
                    <AddressValidator updateWithValidatedAddress={updateWithValidatedAddress}/>
                </div>
  

            <button onClick={toggleShippingInput} className={`${!loggedIn && 'hidden' } text-xs underline text-right`} type='button'>{shippingInputIsOpen ? 'or select from previous addresses' : 'or add address'}</button>

           
        </div>
    );
}

export default ShippingAddressForm;