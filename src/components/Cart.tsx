import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineRight, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from 'context/StateContext';
import cartInstructions from 'public/card-info.png';
import { urlFor } from 'lib/client';
import Image from 'next/image';
import getStripe from 'lib/GetStripe';

const Cart = () => {
  // Define state variables
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  // Create a reference to the cart wrapper element
  const cartRef = useRef<HTMLDivElement>(null);

  // Get the cart state and update functions from the context
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext();

  // Handle the checkout button click event
  const handleCheckout = async () => {
    // If the checkout button is not disabled, continue with the checkout process
    if (!isDisabled) {
      setIsDisabled(true);

      // Get the Stripe instance
      const stripe = await getStripe();

      // Send a POST request to the /api/stripe endpoint with the cart items
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(cartItems),
      });

      // If there is an error, return early
      if (response.status === 500) return;

      // Get the session object from the response
      const session = await response.json();

      // Display a loading toast and redirect to the checkout page using Stripe
      toast.loading('Redirecting to checkout...');
      stripe?.redirectToCheckout({ sessionId: session.id });

      // Reset the disabled state after the checkout process has completed
      setIsDisabled(false);
    }
  };
    return (
      <div className='cart-wrapper' ref={cartRef}>
        <div className='cart-container'>
          {/* Cart heading */}
          <button type='button' className='cart-heading' onClick={() => setShowCart(false)}>
            <AiOutlineLeft/>
            <span className='heading'>Your cart</span>
            <span className='cart-num-items'>({totalQuantities} items)</span>
          </button>
    
          {/* If the cart is empty, display empty cart message */}
          {cartItems.length < 1 && 
            <div className='empty-cart'>
              <AiOutlineShopping size={150} />
              <h3>Your shopping bag is empty</h3>
              <Link href='/'>
                <button type='button' onClick={() => setShowCart(false)} className='btn'>
                  Continue Shopping
                </button>
              </Link> 
            </div>
          }
    
          {/* If the cart has items, display them */}
          <div className='product-container'>
            {cartItems.length >= 1 && cartItems.map((item: any, index: number) => {
              const src = urlFor(item?.image[0]).url();
              return (
                <div className='product' key={item._id}>
                  {/* Product image */}
                  <Image src={src} unoptimized={true} loader={() => src} alt='product cart image' width={1024} height={1024} className='cart-product-image'/>
                  <div className='item-desc'>
                    <div className='flex top'>
                      {/* Product name */}
                      <h5>{item.name}</h5>
                      {/* Product price */}
                      <h4>{item.price.toLocaleString()} €</h4>
                    </div>
                    <div className='flex bottom'>
                      <div>
                        {/* Product quantity */}
                        <p className='quantity-desc'>
                          <span className='minus' onClick={() => toggleCartItemQuantity(item._id, 'dec')}>
                            <AiOutlineMinus/>
                          </span>
                          <span className='num'>{item.quantity}</span>
                          <span className='plus' onClick={() => toggleCartItemQuantity(item._id, 'inc')}>
                            <AiOutlinePlus/>
                          </span>
                        </p>
                      </div>
                      {/* Button to remove product from cart */}
                      <button type='button' className='remove-item' onClick={() => onRemove(item)}>
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
    
          {/* If the cart has items, display cart bottom */}
          {cartItems.length >= 1 && (
            <div className='cart-bottom'>
              {/* Cart subtotal */}
              <div className='total'>
                <h3>Subtotal: </h3>
                <h3>{totalPrice.toLocaleString()} €</h3>
              </div>
              {/* Button to checkout using Stripe */}
              <div className='btn-container'>
                <button type='button' className='btn' disabled={isDisabled} onClick={handleCheckout}>
                  Pay with Stripe
                </button>
                {/* Payment instructions */}
                <p className='payment-instructions'>
                  Fill the credit card like <span>this</span>
                </p>
                <Image src={cartInstructions} alt='payment instructions' width={404} height={112} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
};
export default Cart;