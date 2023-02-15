import '@/styles/globals.css'
import { StateContext}  from 'context/StateContext'
import { Toaster } from 'react-hot-toast'
import {Layout} from '../components'
export default function App({ Component, pageProps } : any) {
  return (
    <StateContext>
    <Layout>
      <Toaster/>
      <Component {...pageProps} />
    </Layout>
    </StateContext>
  )
}
