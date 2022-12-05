import React from 'react'
import { footerList1, footerList2, footerList3 } from '../utils/constants'

const List = ({ items }: { items: string[] }) => {
     return (
          items.map((item, i) => (
               <p key={i} className='text-sm cursor-pointer text-gray-500 hover:underline'>{item}</p>
          ))
     )
}

const Footer = () => {
  return (
    <div className='hidden xl:block'>
          <div className='flex flex-wrap gap-2'>
               <List items={footerList1}/>
               <List items={footerList2}/>
               <List items={footerList3}/>
          </div>
    </div>
  )
}

export default Footer