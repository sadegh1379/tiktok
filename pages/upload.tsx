import React, { useState, useEffect } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { client } from '../utils/client';
import { SanityAssetDocument } from '@sanity/client';
import { topics } from '../utils/constants';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import axios from 'axios';
import { useRouter } from 'next/router';
import { BASE_URL } from '../utils';

const Upload = () => {
     const router = useRouter();
     const { userProfile }: any = useSelector((state: RootState) => state.auth)
     const [isLoading, setIsLoading] = useState(false);
     const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
     const [wrongFileType, setWrongFileType] = useState(false);
     const [caption, setCaption] = useState('');
     const [category, setCategory] = useState(topics[0].name);
     const [savingPost, setSavingPost] = useState(false);
     const [postUploading, setPostUploading] = useState(false);

     const uploadVideo = async (e: any) => {
          setIsLoading(true)
          const selectedFile = e.target.files[0];
          const videoTypes = ['video/mp4', 'video/webm', 'video/ogg']
          if (videoTypes.includes(selectedFile.type)) {
               client.assets.upload('file', selectedFile, {
                    contentType: selectedFile.type,
                    filename: selectedFile.name,
               }).then((data) => {
                    setVideoAsset(data);
                    setIsLoading(false);
               })
          } else {
               setIsLoading(false);
               setWrongFileType(true);
          }
     }

     const handlePost = async () => {
          if (caption && videoAsset?._id && category) {
               setPostUploading(true);
               setSavingPost(true)
               const document = {
                    _type: 'post',
                    caption,
                    video: {
                         _type: 'file',
                         asset: {
                              _type: 'reference',
                              _ref: videoAsset._id
                         }
                    },
                    userId: userProfile?._id,
                    postedBy: {
                         _type: 'postedBy',
                         _ref: userProfile?._id
                    },
                    topic: category
               }
               await client.create(document)
               // await axios.post(`${BASE_URL}/api/post`, document)
               setPostUploading(false)
               router.push('/')
          }
     }
     return (
          <div className='w-full h-full absolute left-0 top-[58px] mb-10 pt-10
          lg:pt-20 bg-[#f8f8f8]'>
               <div className='bg-white lg:p-14 p-5 mx-auto xl:h-[70vh] flex
                gap-6 flex-wrap w-[80%] text-center md:text-start rounded-xl justify-between items-center'>
                    <div>
                         <div>
                              <p className='font-semibold text-2xl'>Upload Video</p>
                              <p className='text-gray-300'>Post a video to your account</p>
                         </div>
                         <div className='border-dashed w-[250px]
                    h-[300px] border-4 border-gray-300
                    cursor-pointer hover:border-red-300
                     hover:bg-gray-100 flex flex-col
                     items-center justify-center mt-2
                     rounded-xl'>
                              {isLoading ? (
                                   <p>Uploading...</p>
                              ) : (
                                   <div>
                                        {videoAsset ? (
                                             <div className='bg-black'>
                                                  <video
                                                       src={videoAsset.url}
                                                       loop
                                                       controls
                                                  >
                                                  </video>
                                             </div>
                                        ) : (
                                             <label className='cursor-pointer'>
                                                  <div
                                                       className='flex h-full text-center flex-col items-center justify-center'
                                                  >
                                                       <div className='flex flex-col justify-center items-center'>
                                                            <p className='text-4xl'>
                                                                 <FaCloudUploadAlt size={40} className='text-gray-500 cursor-pointer' />
                                                            </p>
                                                       </div>
                                                       <div className='mt-3 text-gray-500'>
                                                            <p className='font-semibold'>Upload Video</p>
                                                            <p className='text-sm mt-1'>
                                                                 MP4 or WebMor ogg <br />
                                                                 720*1280 or higher <br />
                                                                 Up to 10 minutes <br />
                                                                 Less than 2GB
                                                            </p>
                                                       </div>
                                                  </div>
                                                  <input className='hidden' type="file" onChange={uploadVideo} />
                                             </label>
                                        )}
                                   </div>
                              )}
                         </div>
                         {wrongFileType && (
                              <p className='text-red-500 text-sm text-center'>Please select a video</p>
                         )}
                    </div>
                    <div className='flex flex-col gap-3 pb-6'>
                         <label className='text-md font-medium'>Caption</label>
                         <input
                              value={caption}
                              onChange={(e) => setCaption(e.target.value)}
                              type="text"
                              className='outline-none border-2 border-gray-200 rounded p-2'
                         />
                         <label className='text-md font-medium'>Choose a Category</label>
                         <select
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                              className='outline-none border-2 border-gray-200 p-2
                                   rounded cursor-pointer'
                         >
                              {topics.map(topic => (
                                   <option className='capitalize cursor-pointer' key={topic.name} value={topic.name}>
                                        {topic.name}
                                   </option>
                              ))}
                         </select>
                         <div className='flex gap-6 mt-10'>
                              <button
                                   className='rounded w-28 lg:w-44 font-medium
                                   border-gray-200 text-md border-2 p-2
                                   outline-none'
                              >
                                   Discard
                              </button>
                              <button
                                   onClick={handlePost}
                                   disabled={postUploading}
                                   type='button'
                                   className='rounded outline-none w-28 lg:w-44 font-medium
                                   text-md p-2 text-white bg-[#F51997]'
                              >
                                   {postUploading ? 'posting...' : 'Post'}
                              </button>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default Upload