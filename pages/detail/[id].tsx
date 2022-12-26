import React, { useState, useRef } from 'react'
import { client } from '../../utils/client'
import { postDetailQuery } from '../../utils/queries'
import { MdCancel } from 'react-icons/md'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import LikeButtons from '../../components/LikeButtons'
import Comments from '../../components/Comments'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { uuid } from 'uuidv4'

type IProp = {
  postDetails: Video
}
const Detail = ({ postDetails }: IProp) => {
  const { userProfile }: any = useSelector((state: RootState) => state.auth);
  console.log('detail:', postDetails)
  const [post, setPost] = useState<Video>(postDetails);
  const videoRef = useRef(null)

  const likeAndDislikeHandler = async (like: Boolean) => {
    if(userProfile) {
      if(like) {
        const data = await client.patch(post?._id)
        .setIfMissing({ likes: [] })
        .insert('after', 'likes[-1]', [
          {
            _key: uuid(),
            _ref: userProfile?._id
          }
        ]).commit();
        setPost({...post, likes: data.likes})
      } else {
        const data = await client.patch(post?._id)
        .unset([`likes[_ref=="${userProfile?._id}"]`])
        .commit();
        setPost({...post, likes: data.likes})
      }
    }
  }
  return (
    <div className='flex absolute top-0 left-0 right-0 bottom-0  bg-gray-200 z-50'>
      <div className='flex mx-auto w-full md:w-[80%] flex-wrap lg:flex-nowrap'>
        <div className='flex w-full relative md:w-1/2 bg-black bg-no-repeat bg-center bg-cover'>
          <MdCancel className='absolute top-3 left-4 cursor-pointer' size={25} color="white" />
          <video
            ref={videoRef}
            controls
            src={post.video.asset.url}
          >

          </video>
        </div>
        <div className='w-full md:w-1/2 bg-white p-2'>
          <div className='w-full flex mt-10'>
            <Link href="/">
                <Image
                  height={50}
                  width={50}
                  src={post.postedBy?.image}
                  className="rounded-full"
                  alt={post.postedBy?.userName}
                />
            </Link>
            <div className='flex flex-col gap-1 ml-3'>
              <Link href="/">
                <div className='flex items-center gap-2'>
                <p className='text-primary font-semibold'>{post.postedBy?.userName}</p>
                <GoVerified className="text-blue-500 mt-1" />
                </div>
              </Link>
              <p className='text-gray-500 text-xs mt-1'>{post.postedBy?.userName}</p>
            </div>
          </div>
          <div>
            {
              userProfile && (
                <div>
                  <LikeButtons
                    likeHandler={() => likeAndDislikeHandler(true)}
                    dislikeHandler={() => likeAndDislikeHandler(false)}
                    likes={post.likes}
                  />
                  <Comments/>
                </div>
              )
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export async function getServerSideProps(
  {
    params: { id }
  }: {
    params: {
      id: String
    }
  }
) {
  const query = postDetailQuery(`${id}`);
  const data = await client.fetch(query);
  // const { data } = await axios.get(`${BASE_URL}/post/${id}`);
  return {
    props: {
      postDetails: data[0],
    }
  }
}

export default Detail
