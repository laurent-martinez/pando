import React, {ReactNode} from 'react'
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

type MyComponentProps = {
  children: ReactNode;
}; 

const Layout = ({children}: MyComponentProps) => {
  return (
    <div className='layout'>
      <Head>
        <title>Pando</title>
      </Head>
      <header>
        <Navbar/>
      </header>
      <main className='main-container'>
      {children}
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Layout