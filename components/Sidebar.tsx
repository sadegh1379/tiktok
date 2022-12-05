import React, { useState } from 'react'
import { ImCancelCircle } from 'react-icons/im'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import Link from 'next/link';
import GoogleLogin from 'react-google-login';
import Discover from './Discover';
import SuggestedAccount from './SuggestedAccount';
import Footer from './Footer';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const normalLink = `flex justify-center items-center rounded hover:bg-primary p-2 gap-3 xl:justify-start
    corsur-pointer font-semibold text-[#F51997]`
    ;

  const userIsLogin = false;
  return (
    <div>
      <div className='block xl:hidden m-2 ml-4 text-xl mt-3 cursor-pointer'
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className='w-20 xl:w-400 overflow-x-hidden flex flex-col justify-start mb-10 border-r-2 border-gray-300 
          xl:border-none p-3
        '>
          <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
              <Link href="/">
                <div className={normalLink}>
                  <p className='text-2xl'><AiFillHome/></p>
                  <span className='hidden xl:block'>For you</span>
                </div>
              </Link>
          </div>
          {!userIsLogin && (
            <div className='hidden xl:block px-2 py-4'>
              <p className='text-gray-400 pl-2'>Login to add like and comments</p>
              <div className='pr-4'>
                <GoogleLogin
                  clientId=''
                  onSuccess={() => {}}
                  onFailure={() => {}}
                  cookiePolicy='single_host_origin'
                  render={(renderProps) => (
                    <button
                      className='text-[#F51997] ml-2 text-lg bg-white w-full border-[1px] border-[#F51997] px-5
                      py-2 mt-3 hover:text-white hover:bg-[#F51997] cursor-pointer rounded-md'
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      Log in
                    </button>
                  )}
                />
              </div>
            </div>
          )}
          <Discover />
          <SuggestedAccount />
          <Footer />
        </div>
      )}
    </div>
  )
}

export default Sidebar