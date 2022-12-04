import React, { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const App = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  if (isSSR) return null;

  return (
    <div>
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
    </div>
  )
}

export default App;
