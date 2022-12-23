import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../../utils'
import { client } from '../../utils/client'
import { postDetailQuery } from '../../utils/queries'

type IProp = {
  postDetails: Video
}
const Detail = ({ postDetails }: IProp) => {
  console.log('detail:', postDetails)
  return (
    <div>
      detail
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
