export interface Users {
  //新規登録にはIDは不要だが、編集には必要なので、IDはオプションにする
  id?: string | number;
  lastName?: string;
  firstName?: string;
  lastNameKana?: string;
  firstNameKana?: string;
  email?: string;
  phone?: string;
  notes?: string;
  gender?: 'male' | 'female' |'',
  dateOfBirth?: string;
  job?: string;
  user_password?: string;
}