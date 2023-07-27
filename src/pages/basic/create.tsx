import { createItem } from '../api/basic'; // あなたのAPIファイルへのパスを使用してください
import { useForm } from 'react-hook-form';

type FormInput = {
  name: string;
  price: number;
};

export default function PostCreate() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInput>();

  const onSubmit = async (data: FormInput) => {
    // 確認ダイアログの表示
    if (window.confirm('Are you sure you want to submit this form?')) {
      try {
        const newItem = await createItem(data);
        console.log(newItem);
        // ここで新しいアイテムを表示したり、他のアクションを実行したりできます。
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: true })} />
      {errors.name && <span>This field is required</span>}
      <input {...register("price", { required: true })} />
      {errors.price && <span>This field is required</span>}
      <input type="submit" />
    </form>
  );
}
