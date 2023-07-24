import axios from 'axios';
import { ContactUs } from '../types/contactUs';

export const PostContactUs = async(data: ContactUs)=> {
  try {
    const response = await axios.post('/api/contact', data);
    return response.data;
  } catch (error) {
    // Error情報をthrowして、呼び出し元でcatchできるようにします
    throw error;
  }
}

export default PostContactUs;