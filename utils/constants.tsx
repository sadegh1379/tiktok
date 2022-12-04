import { BsCode, BsEmojiSunglasses } from 'react-icons/bs';
import { GiCakeSlice, GiGalaxy, GiLipstick } from 'react-icons/gi';
import { FaPaw, FaMedal, FaGamepad } from 'react-icons/fa';

export const topics = [
  {
    name: 'development',
    icon: <BsCode className='mx-auto' />,
  },
  {
    name: 'comedy',
    icon: <BsEmojiSunglasses className='mx-auto'/>,
  },
  {
    name: 'gaming',
    icon: <FaGamepad className='mx-auto'/>,
  },
  {
    name: 'food',
    icon: <GiCakeSlice className='mx-auto'/>,
  },
  {
    name: 'dance',
    icon: <GiGalaxy className='mx-auto'/>,
  },
  {
    name: 'beauty',
    icon: <GiLipstick className='mx-auto'/>,
  },
  {
    name: 'animals',
    icon: <FaPaw className='mx-auto'/>,
  },
  {
    name: 'sports',
    icon: <FaMedal className='mx-auto'/>,
  },
];

export const footerList1 = ['About', 'Newsroom', 'Store', 'Contact', 'Carrers', 'ByteDance', 'Creator Directory']
export const footerList2 = [ 'TikTik for Good','Advertise','Developers','Transparency','TikTik Rewards' ]
export const footerList3 = [ 'Help', 'Safety', 'Terms', 'Privacy', 'Creator Portal', 'Community Guidelines' ]