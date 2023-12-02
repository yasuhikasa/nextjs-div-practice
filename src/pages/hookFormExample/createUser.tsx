import React from 'react';
import { useForm, Controller } from 'react-hook-form'; // React Hook Formをインポート
import Layout from '../components/layout/layout';
import createUserStyles from '../../styles/components/createUser.module.css';
import modalStyles from '../../styles/components/modal.module.css';
import Modal from 'react-modal';
import { jobOptions } from '../utils/jobOption';
import { Users } from '../types/users';
import Button from '../components/button/button';
import { createUser } from '../api/user';
import { NextPage } from 'next';



const CreateUser: NextPage = () => {
  // React Hook FormのuseFormフックを使用します。
  // register関数をフォーム要素に連携させ、handleSubmitでデータを収集します。
  // formStateからerrorsを取得できます。これはバリデーションエラーの情報を提供します。
  // ユーザーの状態(useState)は不要になります、React Hook Formがこれを管理します
  // register関数を使用して登録とバリデーションを行います。
  // イベントハンドラーは不要になります。React Hook Formがこれを管理します。
  const { register, handleSubmit, formState: { errors }, watch, trigger, control } = useForm<Users>();

  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const genderLabels = {
    male: '男性',
    female: '女性',
    '': ''
  };

  // watchメソッドでフォームの値を監視します
  // これにより、フォームの値が変更されるたびに、watchedFieldsオブジェクトが更新されます。
  //  モーダルに表示するために、watchedFieldsオブジェクトを使用します。
  const watchedFields = watch();


  // 送信ボタンがクリックされたときに実行されるonSubmit関数です。
  // 引数dataにはReact Hook Formから提供されたフォームデータが渡されます。
  const onSubmit = async (data: Users) => {
    try {
      // データをAPIに送信
      const response = await createUser(data);
      console.log(response); // 応答をログに出力
    } catch (error) {
      // エラーが発生した場合の処理をここに書く
      console.error('Error submitting user data:', error);
    } finally {
      // 成功時、エラー時に関わらずモーダルを閉じる
      closeModal();
    }
  };

  const openModal = async(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    // triggerを使用して全フィールドのバリデーションを強制的に実行
    const result = await trigger();
    // バリデーションエラーがある場合はモーダルを開かない
    if (!result) return;

    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // 通常のHTMLフォームと同様に、フォーム要素を描画します。
  // 違いは、各入力要素にref={register}属性を追加することです。これによりReact Hook Formがその入力を"登録"し、その状態を管理します。
  // handleSubmit(onSubmit)は、フォームが送信されたときにonSubmit関数を呼び出します。onSubmit関数には、フォームデータが引数として渡されます。
  // errorsオブジェクトは、各入力要素に対応するエラーメッセージを含んでいます。各入力要素の直後にエラーメッセージを表示することで、ユーザーにフィードバックを提供できます。
  // name,value,onChangeなどの属性は不要になります。React Hook Formがこれらを管理します。
  return (
    <Layout>
      <div className={createUserStyles.container}>
      <form className={createUserStyles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={createUserStyles.column}>
          <div className={createUserStyles.name}>
            <div className={createUserStyles.labelInputPair}>
              <label htmlFor="lastName" >姓</label>
              <input
                type="text"
                id="lastName"
                {...register("lastName", { required: "このフィールドは必須です。" })}
                className={createUserStyles.textInput}
              />
              {errors.lastName &&
                <p  className={createUserStyles.errorMessage}>
                  {errors.lastName.message}
                </p>}
            </div>
            <div className={createUserStyles.labelInputPair}>
              <label htmlFor="firstName" >名</label>
              <input
                type="text"
                id="firstName"
                {...register("firstName", { required: "このフィールドは必須です。" })}
                className={createUserStyles.textInput}
              />
              {errors.firstName &&
                <p  className={createUserStyles.errorMessage}>
                  {errors.firstName.message}
                </p>}
            </div>
          </div>
          <div className={createUserStyles.name}>
            <div className={createUserStyles.labelInputPair}>
              <label htmlFor="lastNameKana" >セイ</label>
              <input
                type="text"
                id="lastNameKana"
                {...register("lastNameKana", { required: "このフィールドは必須です。" })}
                className={createUserStyles.textInput}
              />
              {errors.lastNameKana &&
                <p  className={createUserStyles.errorMessage}>
                  {errors.lastNameKana.message}
                </p>}
            </div>
            <div className={createUserStyles.labelInputPair}>
              <label htmlFor="firstNameKana" >メイ</label>
              <input
                type="text"
                id="firstNameKana"
                {...register("firstNameKana", { required: "このフィールドは必須です。" })}
                className={createUserStyles.textInput}
              />
              {errors.firstNameKana &&
                <p  className={createUserStyles.errorMessage}>
                  {errors.firstNameKana.message}
                </p>}
            </div>
          </div>
          <div className={createUserStyles.labelInputPair}>
            <label htmlFor="email">メールアドレス</label>
            <input
              type="email"
              id="email"
              {...register
                ("email",{ required: "このフィールドは必須です。", pattern: {value:/^\S+@\S+$/i, message: "メールアドレスの形式が正しくありません。" }  })}
              className={createUserStyles.textInput}
            />
              {errors.email &&
                <p  className={createUserStyles.errorMessage}>
                  {errors.email.message}
                </p>}
          </div>
          <div className={createUserStyles.labelInputPair}>
            <label htmlFor="phone">電話番号</label>
            <input
              type="tel"
              id="phone"
              {...register
              ("phone", { required: "このフィールドは必須です。",minLength: { value: 6, message: "電話番号は最低6桁必要です。" } })}
              className={createUserStyles.textInput}
            />
            {errors.phone &&
              <p  className={createUserStyles.errorMessage}>
                {errors.phone.message}
              </p>}
          </div>
          <div className={createUserStyles.labelInputPairGender}>
            <label>性別</label>
              <div className={createUserStyles.radioContainer}>
                {/*Controllerがラジオボタンのグループをラップし、どちらかが選択されていない場合にはエラーメッセージを表示します。*/}
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "どちらか選択してください" }}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <div>
                        <label htmlFor="male">男性</label>
                        <input
                          {...field}
                          type="radio"
                          id="male"
                          value="male"
                          checked={field.value === 'male'}
                        />
                      </div>
                      <div>
                        <label htmlFor="female">女性</label>
                        <input
                          {...field}
                          type="radio"
                          id="female"
                          value="female"
                          checked={field.value === 'female'}
                        />
                      </div>
                    </>
                  )}
                />
                    {errors.gender && <p className={createUserStyles.errorMessage}>{errors.gender.message}</p>}
                  </div>
              </div>
          <div className={createUserStyles.labelInputPair}>
                <label htmlFor="dateOfBirth">生年月日</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  {...register("dateOfBirth", { required: "このフィールドは必須です。" })}
                  className={createUserStyles.textBirth}
                />
                {errors.dateOfBirth &&
                <p  className={createUserStyles.errorMessage}>
                  {errors.dateOfBirth.message}
                </p>}
            </div>
            <div className={createUserStyles.labelInputPair}>
              <label htmlFor="job">職業</label>
              <select
                id="job"
                {...register("job", { required: "このフィールドは必須です。" })}
                className={createUserStyles.select}
              >
                {jobOptions.map((option) => (
                  <option value={option.value} key={option.value}>{option.label}</option>
                ))}
              </select>
              {errors.job &&
                <p  className={createUserStyles.errorMessage}>
                  {errors.job.message}
                </p>}
            </div>
        </div>
        <div className={createUserStyles.verticalLine}></div>
        <div className={createUserStyles.column}>
          <div className={createUserStyles.labelInputPair}>
            <label htmlFor="notes">備考</label>
            <textarea
              id="notes"
              {...register("notes")}
              className={createUserStyles.textArea}
            />
          </div>
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
            <p>姓:  {watchedFields.lastName}   名: {watchedFields.firstName}</p>
            <p>セイ:  {watchedFields.lastNameKana}   メイ: {watchedFields.firstNameKana}</p>
            <p>メールアドレス:  {watchedFields.email}</p>
            <p>電話番号:  {watchedFields.phone}</p>
            <p>性別:  {genderLabels[watchedFields.gender || '']}</p>
            <p>生年月日:  {watchedFields.dateOfBirth}</p>
            <p>職業:  {watchedFields.job}</p>
            <p>備考:  {watchedFields.notes}</p>
            <div className={modalStyles.submit}>
              <Button title="キャンセル" className={modalStyles.cancelButton} onClick={closeModal} />
              <Button buttonType="submit" title="登録" className={modalStyles.submitButton} onClick={handleSubmit(onSubmit)} />
            </div>
          </Modal>
        </div>
      </form>
    </div>
    </Layout>
  );
}

export default CreateUser;