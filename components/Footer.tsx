import React from 'react'
import { footerList1, footerList2, footerList3 } from '../utils/constants'

const Footer = () => {
     return (
          <div className='hidden xl:block'>
               <div className='flex flex-wrap gap-2 mt-3'>
                    {footerList1.map((item, i) => (
                         <p key={i} className='text-sm cursor-pointer text-gray-500 hover:underline'>{item}</p>
                    ))}
               </div>
               <div className='flex flex-wrap gap-2 mt-3'>
                    {footerList2.map((item, i) => (
                         <p key={i} className='text-sm cursor-pointer text-gray-500 hover:underline'>{item}</p>
                    ))}
               </div>
               <div className='flex flex-wrap gap-2 mt-3'>
                    {footerList3.map((item, i) => (
                         <p key={i} className='text-sm cursor-pointer text-gray-500 hover:underline'>{item}</p>
                    ))}
               </div>
          </div>
     )
}

export default Footer