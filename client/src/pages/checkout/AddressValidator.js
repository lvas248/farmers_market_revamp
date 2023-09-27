import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearValidatedAddresses, validateAddress } from '../../redux/slices/addressSlice'
import loadingIcon from '../../assets/Icons/icons8-loading-100.png'

function AddressValidator({updateWithValidatedAddress}) {

    const dispatch = useDispatch()

    const validationStatus = useSelector( state => state.address.status )

    const validationResults = useSelector( state => state.address.validationResults)

    const [ selectedAddress, setSelectedAddress ] = useState('') 

    const [ addressText, setAddressText ] = useState('')

    function updateAddressText(e){
        setAddressText(e.target.value)
    }

    function sendValidationRequest(){
        dispatch(validateAddress(addressText))
    }

    function selectAddress(r){
        setSelectedAddress(r.plus_code)
        updateWithValidatedAddress(r)
    }

    function resetAddressSelect(){
        dispatch(clearValidatedAddresses())
        setAddressText('')
        setSelectedAddress('')
    }

    console.log(validationResults)



    const renderResults = validationResults?.map( r =>{
        return <button onClick={()=> selectAddress(r)} key={r.plus_code} type='button' className={`text-[10px] p-3 uppercase border border-black hover:bg-black hover:text-white ${ selectedAddress === r.plus_code && 'bg-black text-white '} ${(selectedAddress && selectedAddress !== r.plus_code && 'hidden')}`} >{r.formatted}</button>
    })


    return ( 
    <div className='flex flex-col gap-4 mt-[4vh]'>
        <div className={`flex gap-2 ${selectedAddress && 'hidden'}`}>
            <input className='addressInput mt-5' placeholder='ex: 1 Maple St, New York, NY 10013' type='text' value={addressText} onChange={updateAddressText} />
            <button  onClick={sendValidationRequest} className={`mt-4 grid place-content-center border-2 h-[50px] bg-black text-white drop-shadow-sm px-4 text-xs w-[15vw] `} type='button'>{validationStatus === 'pending' ? <img className='h-[20px] place-self-center animate-spin' alt='load' src={loadingIcon} /> : 'SEARCH' }</button>
        </div>
        
        <div className={`flex flex-col  `}>

           { !selectedAddress && <p className='text-center text-[10px]'> { (renderResults < 1)  ? 'results: 0' : 'SELECT A VALID ADDRESS'}</p>}
            {renderResults}
        </div>

        <button onClick={resetAddressSelect} className={`${!selectedAddress && 'hidden'} underline text-[10px] text-right`} type='button'>reset selected address</button>
    </div> 
);
}

export default AddressValidator;