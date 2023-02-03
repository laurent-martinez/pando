import React from 'react'

const Home = () => {
  return (
    <>
    Hero Banner
    <div className='products-heading'>
      <h2>Best Selling Products</h2>
      <p>Bottle of Water</p>
    </div>

    <div className='products-container'>
      {["product 1 ", "product 2 ", "product 3 "].map((product) => {
        return product
      })}
    </div>

    Footer
    </>
  )
}

export default Home