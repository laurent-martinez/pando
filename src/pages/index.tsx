import React from 'react';
import { client } from 'lib/client';
import { HeroBanner, Product, FooterBanner } from '../components';

interface Props {
  products: any[];
  bannerData: any[];
}

const Home: React.FC<Props> = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData[1]} />
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Bottle of Water</p>
      </div>

      <div className='products-container'>
        {products?.map((product: any) => {
          return <Product key={product._id} product={product} />;
        })}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

// This function is executed on the server side and it fetches data needed for the page.
export const getServerSideProps = async () => {
  // Define a query to get all products.
  const query = '*[_type == "product"]';
  // Fetch products from the Sanity API.
  const products = await client.fetch(query);
  // Define a query to get all banners.
  const bannerQuery = '*[_type == "banner"]';
  // Fetch banner data from the Sanity API.
  const bannerData = await client.fetch(bannerQuery);
  // Return the fetched data as props to the Home component.
  return {
    props: { products, bannerData },
  };
};

export default Home;