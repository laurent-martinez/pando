import { urlFor } from '../../lib/client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const HeroBanner = ({heroBanner} : any) => {
    const src = urlFor(heroBanner.image).url()
  return (
    <div className='hero-banner-container'>
        <div>
            <p className='beats-solo'>{heroBanner.smallText}</p>
            <h3>{heroBanner.midText}</h3>
            <h1>{heroBanner.largeText}</h1>
            <Image   unoptimized={true} src={src} alt='hero-banner' width={500} height={500} className='hero-banner-image'/>
            <div>
                <Link href={`/product/${heroBanner.product}`}>
                    <button type='button'>{heroBanner.buttonText}</button>
                </Link>
                <div className='desc'>
                    <h5>Description</h5>
                    <p>{heroBanner.desc}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeroBanner