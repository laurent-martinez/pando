import { Product } from '@/components'
import { useStateContext } from 'context/StateContext'
import Image from 'next/image'
import React, {useState} from 'react'
import { AiOutlineMinus, AiOutlinePlus,AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { urlFor,client } from '../../../lib/client'

const ProductDetails = ({product, products}) => {
  const {image,name,details, price } = product;
  const [index, setIndex] = useState(0);
  const {incQty, decQty, qty, onAdd, setShowCart} = useStateContext();
  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  }
  const src = urlFor(image && image[index]).url()
  return (
    <div>
      <div className='product-detail-container'>
        <div className='image-container'>
          <Image src={src} loader={()=> src}  unoptimized={true} alt={name} width={1024} height={1024} className='product-detail-image'/>
        </div>
        <div className='small-images-container'>
          {image?.map((img, i) => {
            const srcSmall = urlFor(img).url();
         return  <Image src={srcSmall} loader={()=> srcSmall}  unoptimized={true} width={1024} height={1024} alt='product images' key={i} className={i == index ? 'small-image selected-image': 'small-image'} onMouseEnter={()=> setIndex(i)}/>
          })}
        </div>
        <div className='product-detail-desc'>
          <h1>{name}</h1>
        <div className='reviews'>
        <div>
          <AiFillStar/>
          <AiFillStar/>
          <AiFillStar/>
          <AiFillStar/>
          <AiOutlineStar/>
        </div>
        <p>(20)</p>
        </div>
        <h4>Details: </h4>
        <p>{details}</p>
        <p className='price'>${price}</p>
        <div className='quantity'>
          <h3>Quantity: </h3>
          <p className='quantity-desc'>
            <span className='minus' onClick={decQty}><AiOutlineMinus/></span>
            <span className='num'>{qty}</span>
            <span className='plus' onClick={incQty}><AiOutlinePlus/></span>
          </p>
        </div>
        <div className='buttons'>
          <button type='button' className='add-to-cart' onClick={()=> onAdd(product,qty)}>Add to Cart</button>
          <button type='button' className='buy-now' onClick={handleBuyNow}>Buy Now</button>
        </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
      </div>
    </div>
  )
  
}
export const getStaticProps = async ({params: {slug }}) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = `*[_type == "product"]`;
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: {products, product}
  }
}
export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{
    slug {
      current
    }
  }`;
  const products = await client.fetch(query);
  const paths = products.map((product) => {
    return {
      params: {slug: product.slug.current}
    }
  })
  return {
    paths,
    fallback: 'blocking'
  }
}
export default ProductDetails