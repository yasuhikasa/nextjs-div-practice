import axios from "axios";
import { Users } from '../types/users';

export const searchUsers = async (searchParams: Partial<Users>) => {
  try {
    const response = await axios.get(`http://localhost:4000/searchUsers/search`, { params: searchParams });
    return response.data;
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
}
