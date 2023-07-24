import axios from 'axios';
import { Users } from '../types/users'; // 型をインポート

const createUser = async (userData: Users) => { // Users 型を指定
  try {
    const response = await axios.post('http://localhost:4000/users/create-user', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export default createUser;