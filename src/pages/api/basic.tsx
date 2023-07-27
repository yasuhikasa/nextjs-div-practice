import axios from 'axios';

// Define the shape of an item here
interface Item {
  id: string;
  name: string;
  price: number;
}

const API_URL = 'http://localhost:3000/api'; // Replace with your Express API base URL

export const getItems = async (): Promise<Item[]> => {
  try {
    const response = await axios.get<Item[]>(`${API_URL}/items`);
    return response.data;
  } catch (error) {
    // Error handling
    console.error(error);
    return [];
  }
}

export const createItem = async (item: Omit<Item, 'id'>): Promise<Item | null> => {
  try {
    const response = await axios.post<Item>(`${API_URL}/items`, item);
    return response.data;
  } catch (error) {
    // Error handling
    console.error(error);
    return null;
  }
}

export const updateItem = async (id: string, updatedItem: Omit<Item, 'id'>): Promise<Item | null> => {
  try {
    const response = await axios.put<Item>(`${API_URL}/items/${id}`, updatedItem);
    return response.data;
  } catch (error) {
    // Error handling
    console.error(error);
    return null;
  }
}

export const deleteItem = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/items/${id}`);
  } catch (error) {
    // Error handling
    console.error(error);
  }
}

// 全ユーザーを削除する関数
export const deleteAllUsers = async (): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/users`);
  } catch (error) {
    console.error(error);
  }
}

// 特定のユーザーを取得する関数
export const getUser = async (id: string): Promise<Item | null> => {
  try {
    const response = await axios.get<Item>(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}







