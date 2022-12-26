import React, { useState, useEffect } from 'react'
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'
import { useSelector } from 'react-redux';
import { RootState } from '../store';

type IProp = {
     likeHandler: () => void,
     dislikeHandler: () => void,
     likes: any[]
}

const LikeButtons = ({ likeHandler, dislikeHandler, likes }: IProp) => {
     const [liked, setLiked] = useState(true);
     const { userProfile }: any = useSelector((state: RootState) => state.auth);

     const likeFilter = likes?.filter(item => item._ref == userProfile._id)
     useEffect(() => {
          if(userProfile && likeFilter?.length){
               setLiked(true)
          } else{
               setLiked(false)
          }
     }, [likes, likeFilter])
     return (
          <div className='my-6 p-2 flex items-center gap-3'>
               {liked ? (
                    <div onClick={dislikeHandler} className='bg-gray-300 p-2 cursor-pointer rounded-full w-10 h-10 flex justify-center items-center'>
                         <MdOutlineFavorite className='text-[#F51997]' size={25} />
                    </div>
               ) : (
                    <div onClick={likeHandler} className='bg-gray-300 p-2 cursor-pointer rounded-full w-10 h-10 flex justify-center items-center'>
                         <MdOutlineFavoriteBorder size={25} />
                    </div>
               )}
               {likes ? likes.length : '0'}
          </div>
     )
}

export default LikeButtons
