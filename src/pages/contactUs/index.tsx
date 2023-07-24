import React from 'react';
import Layout from '../components/layout/layout';
import styles from '../../styles/components/contactUs.module.css';
import Button from '../components/button/button';
import { ContactUs } from '../types/contactUs';



const Index:React.FC = () => {

  const [contactUs, setContactUs] = React.useState({
    name: '',
    email: '',
    tel: '',
    subject: '',
    message: '',
  });

  const subject =[
    ' 聞きたいことA','聞きたいことB','聞きたいことC'
  ];


  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    console.log('submit');
  };

  const InputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setContactUs((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
    <Layout>
      <div className={styles.container}>
        <form className={styles.form}>
          <h2 className={styles.h2}>お問い合わせ</h2>
          <div className={styles.labelInputPair}>
            <label htmlFor="name">お名前</label>
            <input type="text" id="name" name="name" value={contactUs.name} className={styles.textInput} onChange={InputChange} />
          </div>
          <div className={styles.labelInputPair}>
            <label htmlFor="email">メールアドレス</label>
            <input type="email" id="email" name="email" value={contactUs.email} className={styles.textInput} />
          </div>
          <div className={styles.labelInputPair}>
            <label htmlFor="tel">電話番号</label>
            <input type="tel" id="tel" name="tel" value={contactUs.tel} className={styles.textInput} />
          </div>
          <div className={styles.labelInputPair}>
            <label htmlFor="subject">件名</label>
            <select id="subject" name="subject" value={contactUs.subject}>
              {subject.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          <div className={styles.labelInputPair}>
            <label htmlFor="message">お問い合わせ内容</label>
            <textarea id="message" name="message" value={contactUs.message} className={styles.textArea}>
            </textarea>
          </div>
          <div className={styles.buttonPlace}>
            <Button title="送信" buttonType="submit" className={styles.button} onClick={handleSubmit} />
          </div>
        </form>
      </div>
      </Layout>
    </>
  );
}

export default Index;