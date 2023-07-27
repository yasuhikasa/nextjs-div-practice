import React, { useEffect, useState } from 'react';
import { getItems, deleteItem, Item } from '../api/basic';

export default function ItemList() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const data = await getItems();
        setItems(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (id:  number) => {
    try {
      await deleteItem(id);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.name} - {item.price}
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
