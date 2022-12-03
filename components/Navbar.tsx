import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '../utils/tiktik-logo.png'

const Navbar = () => {
  return (
    <div>
      <Link href="/">
        <div>
          <Image
            className='cursor-pointer'
            src={Logo}
            alt="tiktik"
            width={100}
          />
        </div>
      </Link>
    </div>
  )
}

export default Navbar