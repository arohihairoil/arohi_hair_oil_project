import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {

  const { currency, addToCart, isInCart, goToCart } = useContext(ShopContext)

  return (
    <div className='text-gray-700 cursor-pointer'>

      <Link onClick={() => scrollTo(0, 0)} to={`/product/${id}`}>
        <div className='overflow-hidden'>
          <img className='w-full h-60 object-cover hover:scale-110 transition ease-in-out' src={image[0]} alt="product images" />

        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>
      </Link>

      {isInCart(id) ? (
        <button onClick={goToCart} className='bg-black text-white px-8 py-3 text-sm mt-6'>
          Go to Cart
        </button>
      ) : (
        <button onClick={() => addToCart(id)} className='bg-black text-white px-8 py-3 text-sm mt-6'>
          Add to Cart
        </button>
      )}
    </div>
  )
}

export default ProductItem
