import axios from 'axios';
import { Users } from '../types/users'; // 型をインポート

export const createUser = async (userData: Users) => { // Users 型を指定
  try {
    const response = await axios.post('http://localhost:4000/users/create-user', userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export const getUsers = async (page:number) => {
  try {
    const response = await axios.get(`http://localhost:4000/users/get-users?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
}

export const getTotalUsers = async () => {
  const response = await fetch('http://localhost:4000/users/get-total-users');
  if (!response.ok) {
    throw new Error('Error getting total users');
  }
  const data = await response.json();
  return data;
};

//編集用に個別のユーザーを取得する処理
export const getUser = async (id: number) => {
  try {
    const response = await axios.get(`http://localhost:4000/users/get-user/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting user with ID: ${id}`, error);
    throw error;
  }
}

export const editUser = async (userData: Users) => {
  try {
    const response = await axios.put(`http://localhost:4000/users/edit-user/${userData.id}`, userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error editing user:', error);
    throw error;
  }
}


export const deleteUsers = async (userIds: string[]) => {
  try {
    // Promise.allを使用して、すべての削除リクエストが完了するのを待つ
    await Promise.all(userIds.map(async (id) => {
      const response = await axios.delete(`http://localhost:4000/users/delete-user/${id}`);
      return response.data;
    }));
  } catch (error) {
    console.error('Error deleting users:', error);
    throw error;
  }
}
