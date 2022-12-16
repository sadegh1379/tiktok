
import { client } from '../utils/client';
import { allPostsQuery } from '../utils/queries';
import  VideoCard  from '../components/VideoCard';
import  NoResult from '../components/NoResult';
type VProp = {
  videos: Video[]
}

export default function Home({ videos }: VProp) {
  console.log('videos:', videos);
  return (
    <div className='flex flex-col h-full videos'>
      {videos.length ? (
        videos.map(video => (
          <VideoCard post={video} key={video._id}/>
        ))
      ) : (
        <NoResult text={'No Videos'}/>
      )}
    </div>
  )
}

export const getServerSideProps = async () => {
  // const { data } = await axios.get('http://localhost:3000/api/post');
  const query = allPostsQuery();
  const data = await client.fetch(query);
  return{
    props:{
      videos: data
    }
  }
}
