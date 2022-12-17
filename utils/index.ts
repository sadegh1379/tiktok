import axios from 'axios';
import jwt_decode from 'jwt-decode'

type User = {
  name: String
  picture: String
  sub: String
}

export const createOrGetUser = (response: any) => {
  const decodded: User = jwt_decode(response.credential);
  const { name, picture, sub } = decodded;
  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  }
  axios.post('http://localhost:3000/api/auth', user);
}

// export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// export const createOrGetUser = async (response: any, addUser: any) => {
//   var base64Url = response.credential.split('.')[1];
//   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//   }).join(''));
  
  
//   addUser(user);

//   await axios.post(`${BASE_URL}/api/auth`, user);
// };