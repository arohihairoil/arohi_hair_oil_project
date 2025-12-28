import React from 'react'
import { FaCreditCard, FaUndoAlt, FaHeadset, FaShippingFast } from 'react-icons/fa'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      
      <div>
        <FaCreditCard className="m-auto mb-2 text-xl" />
        <p className='font-semibold text-[#D81B60]'><b>PAYMENT POLICY</b></p>
        <p className='text-gray-500'>Prepaid only</p>
        <p className='text-gray-500'>We accept UPI and online payments</p>
        <p className='text-gray-500'>No Cash on Delivery (COD)</p>
      <p className='text-gray-500'> <b>Imp Note</b> : Once an order is placed,<br/> it cannot be cancelled under any circumstances.</p>

      </div>

      <div>
        <FaUndoAlt className="m-auto mb-2 text-xl" />
        <p className='font-semibold text-[#D81B60]'><b>RETURN POLICY</b></p>
        <p className='text-gray-500'>Returns allowed only if the product is damaged</p>
        <p className='text-gray-500'>Damage during shipping or expired on arrival</p>
        <p className='text-gray-500'>No returns for personal choice</p>
      </div>

      <div>
        <FaShippingFast className="m-auto mb-2 text-xl" />
        <p className='font-semibold text-[#D81B60]'><b>SHIPPING POLICY</b></p>
        <p className='text-gray-500'>Delivery within 5–7 business days (All India)</p>
        <p className='text-gray-500'>Tracking will be available in the orders section</p>
      </div>

    </div>
  )
}

export default OurPolicy
