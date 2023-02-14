import React, {useEffect} from 'react'
import {BsBagCheckFill as SuccessBag} from 'react-icons/bs'
import Link from 'next/link'
import { useStateContext } from 'context/StateContext'
import { confettiParty } from 'lib/utils'

const Success = () => {
    const {setCartItems, setTotalPrice, settotalQuantities} = useStateContext();

    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        settotalQuantities(0);
        confettiParty();
    }, [setCartItems, setTotalPrice, settotalQuantities])
  return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <SuccessBag/>
            </p>
            <h2>Thank you for your order!</h2>
            <p className='email-msg'>Check your email inbox for the receipt.</p>
            <p className='description'>
                If you have any questions, please contact us at <a className='email' href='mailto:laurentmartinezdev@gmail.com'>laurentmartinezdev@gmail.com</a>
            </p>
            <Link href='/'>
                <button type='button' width='300px' className='btn'>
                    Continue Shopping
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Success