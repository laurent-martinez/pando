import React from 'react'
import Link from 'next/link'
import { urlFor } from '../../lib/client'
import Image from 'next/image'

const Product = ({product : {image,name,slug,price}} : any) => {
  const src = urlFor(image && image[0]).url()
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          <Image loader={()=> src}  unoptimized={true} src={src} alt={name} width={250} height={250} className='product-image' />
          <p className='product-name'>{name}</p>
          <p className='product-price'>$ {price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product