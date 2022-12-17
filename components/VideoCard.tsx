import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { GoVerified } from 'react-icons/go';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';

type Post = {
  post: Video
}

const VideoCard = ({ post }: Post) => {
  const [isHover, setIsHover] = useState<Boolean>(false)
  const [playing, setPlaying] = useState<Boolean>(false)
  const [videoMuted, setVideoMuted] = useState<Boolean>(false)
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoHandler = () => {
    if(playing) {
      videoRef.current?.pause()
      setPlaying(false);
    } else {
      videoRef.current?.play()
      setPlaying(true);
    }
  }

  const handleMuteVideo = () => {
    if(videoMuted) {
      videoRef.current?.muted
    }
  }
  return (
    <div className="border-b-2 pb-3 border-gray-200 p-3">
      <div className='flex gap-3'>
        <div className='flex'>
          <Link href="/">
            <>
              <Image
                height={50}
                width={50}
                src={post.postedBy.image}
                className="rounded-full"
                alt={post.postedBy.userName}
              />
            </>
          </Link>
        </div>
        <div className='flex items-start gap-1'>
          <Link href="/">
            <p className='text-primary font-semibold'>{post.postedBy.userName}</p>
          </Link>
          <GoVerified className="text-blue-500 mt-1" />
          <p className='text-gray-500 text-xs mt-1'>. {post.postedBy.userName}</p>
        </div>
      </div>
      <div className='lg:ml-20 flex gap-4 relative mt-3'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className='rounded-3xl relative'>
          <video
            src={post.video.asset.url}
            className="w-[200px] h-[300px] lg:w-[600px]
            lg:h-[530px] md:h-[400px] bg-gray-300 rounded-3xl"
            loop
            ref={videoRef}
            onClick={videoHandler}
          >

          </video>
          {isHover && (
            <div className='absolute bottom-3 px-5 left-8 md:left-14
            flex gap-10'>
              {playing ? (
                <button onClick={videoHandler}>
                  <BsFillPauseFill
                  className='text-white text-xl lg:text-2xl'
                  />
                </button>
              ) : (
                <button onClick={videoHandler}>
                  <BsFillPlayFill
                  className='text-white text-xl lg:text-2xl'
                  />
                </button>
              )}
              {videoMuted ? (
                <button onClick={() => setVideoMuted(false)}>
                  <HiVolumeOff
                  className='text-white text-xl lg:text-2xl'
                  />
                </button>
              ) : (
                <button onClick={() => setVideoMuted(true)}>
                  <HiVolumeUp
                  className='text-white text-xl lg:text-2xl'
                  />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoCard