import React from 'react'
import Link from 'next/link';
import {AiOutlineShopping} from 'react-icons/ai';
import { useStateContext } from 'context/StateContext';
import logo from 'public/robotKlein-1.png';
import Cart from './Cart';
import Image from 'next/image';

const Navbar = () => {
  const {showCart, setShowCart, totalQuantities} = useStateContext();
  return (
    <div className='navbar-container'>
      <div className='logo'>
        <Link href='/'><Image src={logo} alt='logo image' width={463} height={330} className='maj-logo'/></Link>
      </div>
      <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
        <AiOutlineShopping/>
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>
     {showCart && <Cart />} 
    </div>
  )
}

export default Navbar