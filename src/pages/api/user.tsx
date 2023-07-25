import axios from 'axios';
import { Users } from '../types/users'; // 型をインポート

export const createUser = async (userData: Users) => { // Users 型を指定
  try {
    const response = await axios.post('http://localhost:4000/users/create-user', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export const getUsers = async () =>{
  try {
    const response = await axios.get('http://localhost:4000/users/get-users');
    return response.data;
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
}


