import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { topics } from '../utils/constants'

const Discover = () => {
  const route = useRouter();
  const { topic } = route.query;
     
  const activeTopicStyle = `xl:border-2 hover:bg-primary xl:border-[#F51997] px-3 py-2 rounded xl:rounded-full
  flex items-center gap-2 justify-center cursor-pointer text-[#FF1997]`;
  const topicStyle = `transition duration-200 ease-in xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full
  flex items-center gap-2 justify-center cursor-pointer text-black`;
  return (
    <div className='border-b-2 border-gray-200'>
     <p className='hidden xl:block text-gray-500 font-semibold pb-3'>Popular topics</p>
     <div className='flex flex-wrap gap-2 justify-center mb-3'>
          {topics.map(item => (
               <Link href={`/?topic=${item.name}`}>
                    <div className={topic === item.name ? activeTopicStyle : topicStyle}>
                         <span className='font-semibold text-center'>
                              {item.icon}
                         </span>
                         <span className='hidden xl:block font-semibold capitalize'>
                              {item.name}
                         </span>
                    </div>
               </Link>
          ))}
     </div>
    </div>
  )
}

export default Discover