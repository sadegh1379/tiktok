import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '../utils/tiktik-logo.png'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { createOrGetUser } from '../utils'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { addUser } from '../slices/auth.slice'
import { AiOutlineLogout, AiOutlinePlus } from 'react-icons/ai'

const Navbar = () => {
  const { userProfile }: any = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch();

  const createUser = (user: IUser) => {
    dispatch(addUser(user))
  }
  return (
    <div className='w-full flex justify-between items-center
    border-b-2 border-gray-200 py-2 px-3'>
      <Link href="/">
        <div className='w-[100px] md:w-[130px]'>
          <Image
            className='cursor-pointer'
            src={Logo}
            alt="tiktik"
          />
        </div>
      </Link>
      <div>
        SEARCH
      </div>
      <div>
        {userProfile ? (
          <div className='flex items-center gap-3 md:gap-6'>
            <Link href="/upload">
              <button className='flex items-center gap-2 border p-2'>
                <AiOutlinePlus fontSize={18} />{` `}
                <p className='hidden md:block'>Upload</p>
              </button>
            </Link>
            {
              userProfile.image && (
                <Link href="/">
                  <>
                    <Image
                      width={40}
                      height={40}
                      className="rounded-full"
                      src={userProfile.image}
                      alt={userProfile.userName}
                    />
                  </>
                </Link>
              )
            }
            <button
              type='button'
              className='border rounded-full p-3 shadow-md'
              onClick={() => {
                googleLogout()
                dispatch(addUser(null))
              }}
            >
              <AiOutlineLogout color='red' size={20}/>
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(re) => createOrGetUser(re, createUser)}
            onError={() => console.log('error')}
          />
        )}
      </div>
    </div>
  )
}

export default Navbar