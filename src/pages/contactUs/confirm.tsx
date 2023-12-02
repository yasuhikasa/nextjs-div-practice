import React, { useContext } from 'react';
import { FormDataContext } from '../context/formDataProvider';
import Button from '../components/button/button';
import PostContactUs from '../api/postContactUs';
import { useRouter } from 'next/router';
import { NextPage } from 'next';


const Confirm:NextPage = () => {
  const context = useContext(FormDataContext);

  const router = useRouter();

  if (!context) {
    return <div>Loading...</div>;  // または適切なエラーメッセージ
  }

  const { formData } = context;

  const handleSubmit = async() => {
    // ここでバックエンドにデータを送信する処理を書く
    try {
      const response = await PostContactUs(formData);
      console.log(response);
    // 送信が成功したら、送信完了画面へ画面遷移
      router.push('/contactUs/complete');
    } catch (error) {
      console.error(error);
      alert('お問い合わせの送信に失敗しました。もう一度お試しください。');
    }
  };

  const handleReset = () => {
    router.back()
  };

  return (
    <>
    <h2>送信内容の確認</h2>
    <p>この内容で送信していいですか？</p>
    <div>
      <p>お名前: {formData?.name}</p>
      <p>メールアドレス: {formData?.email}</p>
      <p>電話番号: {formData?.tel}</p>
      <p>件名: {formData?.subject}</p>
      <p>お問い合わせ内容: {formData?.message}</p>
    </div>
    <div>
      <Button title="戻る" buttonType="button" onClick={handleReset}/>
      <Button title="送信" buttonType="submit" onClick={handleSubmit} />
    </div>
    </>
  );
}

export default Confirm;
