
import axios from 'axios';
import { client } from '../utils/client';
import { allPostsQuery } from '../utils/queries';

type VProp = {
  videos: Video
}

export default function Home({ videos }: VProp) {
  console.log('videos:', videos);
  return (
    <div>
      <p className="text-3xl font-bold underline">sadegh</p>
    </div>
  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get('http://localhost:3000/api/post');
  return{
    props:{
      videos: data
    }
  }
}
