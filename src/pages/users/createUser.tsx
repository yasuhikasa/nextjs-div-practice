import React from 'react';
import Layout from '../components/layout/layout';
import createUserStyles from '../../styles/components/createUser.module.css';
import modalStyles from '../../styles/components/modal.module.css';
import Modal from 'react-modal';
import { jobOptions } from '../utils/jobOption';
import { Users } from '../types/users';
import Button from '../components/button/button';
import { createUser } from '../api/user';


const CreateUser: React.FC = () => {
  const [users, setUsers] = React.useState<Users>({
    lastName: '',
    firstName: '',
    lastNameKana: '',
    firstNameKana: '',
    email: '',
    phone: '',
    notes: '',
    gender: '',
    dateOfBirth: '',
    job: '',
  });

  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const genderLabels = {
    male: '男性',
    female: '女性',
    '': ''
  };

  const jobOptionsMap: { [key: string]: string } = {
    '': '選択してください',
    'student': '学生',
    'engineer': 'エンジニア',
    'teacher': '教師',
    'artist': '芸術家'
    // ...
  };



  // 各種フォーム要素（テキストフィールド、チェックボックス、ラジオボタン、セレクトボックスなど）から発生する onChange イベントを処理
  const inputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUsers((prevData) => ({ ...prevData, [name]: value }));
  };

//   const inputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value, type, checked } = event.target;
//     if (type === "checkbox") {
//       setUsers((prevData) => ({ ...prevData, [name]: checked }));
//     } else {
//       setUsers((prevData) => ({ ...prevData, [name]: value }));
//     }
// };


  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    handleSubmit();
  };

  const handleSubmit = async() => {
    try {
      // データをAPIに送信
      const response = await createUser(users);
      console.log(response); // 応答をログに出力
    } catch (error) {
      // エラーが発生した場合の処理をここに書く
      console.error('Error submitting user data:', error);
    } finally {
      // 成功時、エラー時に関わらずフォームをリセット
      setUsers({
        lastName: '',
        firstName: '',
        lastNameKana: '',
        firstNameKana: '',
        email: '',
        phone: '',
        notes: '',
        gender: '',
        dateOfBirth: '',
        job: '',
      });
      // 成功時、エラー時に関わらずモーダルを閉じる
      closeModal();
    }
  };

  const openModal = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Layout>
      <div className={createUserStyles.container}>
        <form className={createUserStyles.form} onSubmit={handleSubmit}>
          <div className={createUserStyles.column}>
            <div className={createUserStyles.name}>
              <div className={createUserStyles.labelInputPair}>
                <label htmlFor="lastName" >姓</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={users.lastName}
                  className={createUserStyles.textInput}
                  onChange={inputChange} />
              </div>
              <div className={createUserStyles.labelInputPair}>
                <label htmlFor="firstName" >名</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={users.firstName}
                  className={createUserStyles.textInput}
                  onChange={inputChange} />
              </div>
            </div>
            <div className={createUserStyles.name}>
              <div className={createUserStyles.labelInputPair}>
                <label htmlFor="lastNameKana" >セイ</label>
                <input
                  type="text"
                  id="lastNameKana"
                  name="lastNameKana"
                  value={users.lastNameKana}
                  className={createUserStyles.textInput}
                  onChange={inputChange} />
              </div>
              <div className={createUserStyles.labelInputPair}>
                <label htmlFor="firstNameKana" >メイ</label>
                <input
                  type="text"
                  id="firstNameKana"
                  name="firstNameKana"
                  value={users.firstNameKana}
                  className={createUserStyles.textInput}
                  onChange={inputChange} />
              </div>
            </div>
            <div className={createUserStyles.labelInputPair}>
              <label htmlFor="email">メールアドレス</label>
              <input
                type="email"
                id="email"
                name="email"
                value={users.email}
                className={createUserStyles.textInput}
                onChange={inputChange} />
            </div>
            <div className={createUserStyles.labelInputPair}>
              <label htmlFor="phone">電話番号</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={users.phone}
                className={createUserStyles.textInput}
                onChange={inputChange} />
            </div>
            <div className={createUserStyles.labelInputPairGender}>
              <label>性別</label>
              <div className={createUserStyles.radioContainer}>
                <div>
                <label htmlFor="male">男性</label>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={users.gender === 'male'}
                    onChange={inputChange} />
                  </div>
                <div>
                  <label htmlFor="female">女性</label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={users.gender === 'female'}
                    onChange={inputChange} />
                </div>
              </div>
            </div>
            <div className={createUserStyles.labelInputPair}>
                  <label htmlFor="dateOfBirth">生年月日</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={users.dateOfBirth}
                    className={createUserStyles.textBirth}
                    onChange={inputChange} />
              </div>
              <div className={createUserStyles.labelInputPair}>
                <label htmlFor="job">職業</label>
                <select
                  id="job"
                  name="job"
                  value={users.job}
                  className={createUserStyles.select}
                  onChange={inputChange} >
                  {jobOptions.map((option) => (
                    <option value={option.value} key={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
          </div>
          <div className={createUserStyles.verticalLine}></div>
          <div className={createUserStyles.column}>
            <div className={createUserStyles.labelInputPair}>
              <label htmlFor="notes">備考</label>
              <textarea
                id="notes"
                name="notes"
                value={users.notes}
                className={createUserStyles.textArea}
                onChange={inputChange} />
            </div>
            <div>
            <div className={modalStyles.openModal}>
              <Button title="登録" onClick={openModal} className={modalStyles.submitButton} />
            </div>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="確認"
                className={modalStyles.modal}
                overlayClassName={modalStyles.overlay}
              >
                <div><p>この内容で登録してよろしいですか？</p></div>
                <p>姓:  {users.lastName}   名: {users.firstName}</p>
                <p>セイ:  {users.lastNameKana}   メイ: {users.firstNameKana}</p>
                <p>メールアドレス:  {users.email}</p>
                <p>電話番号:  {users.phone}</p>
                <p>性別:  {users.gender ? genderLabels[users.gender] : ''}</p>
                <p>生年月日:  {users.dateOfBirth}</p>
                <p>職業:  {users.job ? jobOptionsMap[users.job] : ''}</p>
                <p>備考:  {users.notes}</p>
                <div className={modalStyles.submit}>
                  <Button title="キャンセル" className={modalStyles.cancelButton} onClick={closeModal} />
                  <Button buttonType="submit" title="登録" className={modalStyles.submitButton} onClick={handleClick} />
                </div>
              </Modal>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default CreateUser;
