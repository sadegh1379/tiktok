import React, { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from '../store'
import { Provider } from 'react-redux'

const App = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  if (isSSR) return null;

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_LOGIN_API}`}>
      <Provider store={store}>
        <Navbar />
        <div className='flex'>
          <div className='flex gap-6 md:gap-20'>
            <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
              <Sidebar />
            </div>
          </div>
          <div className='mt-4 flex flex-1 flex-col gap-10 h-[88vh] videos'>
            <Component {...pageProps} />
          </div>
        </div>
      </Provider>
    </GoogleOAuthProvider>
  )
}

export default App;
