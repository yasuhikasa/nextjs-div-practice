import React, { useContext } from 'react';
import Layout from '../components/layout/layout';
import styles from '../../styles/components/contactUs.module.css';
import Button from '../components/button/button';
import { ContactUs } from '../types/contactUs';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { FormDataContext } from '../context/formDataProvider';



const Index:React.FC = () => {

  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactUs>();

  const { setFormData } = useContext(FormDataContext);


  //フォーム送信時にすべてのフォームデータが onSubmit 関数に渡されます。
  const onSubmit = async (data: ContactUs) => {
    // バックエンドに送信する場合の処理をここに書く
      // try {
      //   const response = await postContactUsForm(data);
      //   console.log(response);
      //   alert('お問い合わせ内容が送信されました。');
      //   reset(); // フォームのリセット
      // } catch (error) {
      //   console.error(error);
      //   alert('お問い合わせの送信に失敗しました。もう一度お試しください。');
      // }

    // ここでsetFormDataを使ってデータを保存する
    setFormData(data);

    // 確認画面へ画面遷移
      router.push('/contactUs/confirm');
  };


  const subject =[
    ' 聞きたいことA','聞きたいことB','聞きたいことC'
  ];


  return (
    <>
    <Layout>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.h2}>お問い合わせ</h2>
          <div className={styles.labelInputPair}>
            <label htmlFor="name">お名前</label>
            <input
              type="text"
              id="name"
              className={errors.name ? styles.textInputError : styles.textInput}
              {...register("name", { required: true })} />
              {errors.name && <span className={styles.error}>お名前は必須です</span>}
          </div>
          <div className={styles.labelInputPair}>
            <label htmlFor="email">メールアドレス</label>
            <input
              type="email"
              id="email"
              className={errors.email ? styles.textInputError : styles.textInput}
              {...register("email", { required: true , pattern: /^\S+@\S+$/i })} />
              {errors.email && <span className={styles.error}>有効なメールアドレスを入力してください</span>}
          </div>
          <div className={styles.labelInputPair}>
            <label htmlFor="tel">電話番号</label>
            <input
              type="tel"
              id="tel"
              className={errors.tel ? styles.textInputError : styles.textInput}
              {...register("tel", { required: true ,minLength: 6 })} />
              {errors.tel && <span className={styles.error}>有効な電話番号を入力してください</span>}
          </div>
          <div className={styles.labelInputPair}>
            <label htmlFor="subject">件名</label>
            <select id="subject" {...register("subject")}>
              {subject.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          <div className={styles.labelInputPair}>
            <label htmlFor="message">お問い合わせ内容</label>
            <textarea
              id="message"
              className={errors.message ? styles.textInputError : styles.textInput}
              {...register("message", { required: true })}>
            </textarea>
            {errors.message && <span className={styles.error}>お問い合わせ内容は必須です</span>}
          </div>
          <div className={styles.buttonPlace}>
            <Button title="送信" buttonType="submit" className={styles.button} />
          </div>
        </form>
      </div>
      </Layout>
    </>
  );
}

export default Index;