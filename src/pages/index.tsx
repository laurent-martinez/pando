import  {HeroBanner, Product, FooterBanner}  from  '../components'
import React from 'react'
import { client } from 'lib/client'

const Home = ({products, bannerData} : any) => {
  return (
    <>
    <HeroBanner heroBanner={bannerData[1]}/>
    <div className='products-heading'>
      <h2>Best Selling Products</h2>
      <p>Bottle of Water</p>
    </div>

    <div className='products-container'>
      {products?.map((product : any) => {
        return <Product key={product._id} product={product} />
      })}
    </div>

  <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);
  return {
    props: {products, bannerData}
  }
}
export default Home