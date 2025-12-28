import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 border-t'>
          <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-[19px] text-gray-600'>Our Store Location : </p>
          <p className=' text-gray-500 text-[19px]'>Arohi Enterprises<br/> D.No.4-2-70/A, D.B Colony, Hindupur <br /> Sathya Sai(D), Andhra Pradesh - 515201</p>
          <p className=' text-gray-500 text-[19px]'>Phone Number : 7207085598  <br /> Email: arohihairoilsra@gmail.com</p>
          
        </div>
      </div>
    </div>
  )
}

export default Contact
