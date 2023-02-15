import Link from 'next/link'
import React from 'react'
import { AiFillMail,AiOutlineGithub } from 'react-icons/ai'
const Footer = () => {
  return (
    <div className='footer-container'>
      <Link href='https://www.laurentmartinez.fr/'>2023 <span className='black'>Laurent Martinez</span> All rights reserved</Link>
      <div className='icons'>
      <Link href='mailto:martilaurier@gmail.com' target='_blank' className='icons-item'><AiFillMail/></Link>
      <Link href='https://github.com/laurent-martinez' target='_blank' className='icons-item'><AiOutlineGithub/></Link>
      </div>
    </div>
  )
}

export default Footer