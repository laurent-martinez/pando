import React, {useRef, useState} from 'react'
import Link from 'next/link'
import { AiOutlineMinus, AiOutlinePlus,AiOutlineLeft,AiOutlineRight, AiOutlineShopping } from 'react-icons/ai'
import {TiDeleteOutline} from 'react-icons/ti'
import toast from 'react-hot-toast'
import { useStateContext } from 'context/StateContext'
import cartInstructions from 'public/card-info.png'
import { urlFor } from 'lib/client'
import Image from 'next/image'
import getStripe from 'lib/GetStripe'

const Cart = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const cartRef = useRef<any>();
  const {totalPrice, totalQuantities,cartItems, setShowCart,toggleCartItemQuantity, onRemove} = useStateContext();
  const handleCheckout = async() => {
    if (!isDisabled) {
    setIsDisabled(true);
    const stripe = await getStripe();
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(cartItems)
      });
      if(response.status === 500) return;
      
      const session = await response.json();
      console.log("hey hey",session);
      toast.loading('Redirecting to checkout...');
      stripe?.redirectToCheckout({sessionId : session.id})
      setIsDisabled(false);
    }
    }
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button type='button'
        className='cart-heading'
        onClick={()=> setShowCart(false)}>
          <AiOutlineLeft/>
          <span className='heading'>Your cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>
        {cartItems.length < 1 && 
        <div className='empty-cart'>
        <AiOutlineShopping size={150} />
        <h3>Your shopping bag is empty</h3>
        <Link href='/'>
          <button type='button'
          onClick={()=> setShowCart(false)}
          className='btn'>
            Continue Shopping
          </button>
        </Link> 
        </div>
        }
         <div className='product-container'>
          {cartItems.length >= 1 && cartItems.map((item : any,index: number)=> {
              const src = urlFor(item?.image[0]).url()
           return  <div className='product' key={item._id}>
              <Image src={src}  unoptimized={true} loader={()=> src} alt='product cart image' width={1024} height={1024} className='cart-product-image'/>
              <div className='item-desc'>
                <div className='flex top'>
                  <h5>{item.name}</h5>
                  <h4>{item.price.toLocaleString()} €</h4>
                </div>
                <div className='flex bottom'>
                  <div>
                  <p className='quantity-desc'>
            <span className='minus' onClick={()=> toggleCartItemQuantity(item._id, 'dec')}><AiOutlineMinus/></span>
            <span className='num'>{item.quantity}</span>
            <span className='plus' onClick={()=> toggleCartItemQuantity(item._id, 'inc')}><AiOutlinePlus/></span>
          </p>
                  </div>
                  <button type='button'
                  className='remove-item'
                  onClick={()=> onRemove(item)}>
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          })}
         </div>
         {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal: </h3>
              <h3>{totalPrice.toLocaleString()} €</h3>
            </div>
            <div className='btn-container'>
              <button type='button'
              className='btn'
              disabled={isDisabled}
              onClick={handleCheckout}>
                Pay with Stripes
              </button>
              <p className='payment-instructions'>
                  Fill the credit card like <span>this</span>
                </p>
              <Image src={cartInstructions} alt='payment instructions' width={404} height={112} />
            </div>
          </div>
         )}
      </div>
    </div>
  )
}

export default Cart