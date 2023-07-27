import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { getItem, updateItem } from '../../api/basic'; // あなたのAPIファイルへのパスを使用してください

type FormInput = {
  name: string;
  price: number;
};

export default function ItemUpdate() {
  const { register, handleSubmit, setValue } = useForm<FormInput>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const id = Number(router.query.id);

  useEffect(() => {
    const fetchData = async () => {
      if (!isNaN(id)) {
        const fetchedItem = await getItem(id);
        setValue('name', fetchedItem?.name || "");
        setValue('price', fetchedItem?.price || 0);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, setValue]);

  const onSubmit = async (data: FormInput) => {
    try {
      const updatedItem = await updateItem(id, data);
      console.log(updatedItem);
      // Here you can perform other actions with the updated item
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      <input {...register("price")} />
      <input type="submit" value="Update" />
    </form>
  );
}
