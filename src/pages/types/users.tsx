export interface Users {
  id: number;
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  email: string;
  phone: string;
  notes?: string;
  gender: 'male' | 'female' |'',
  dateOfBirth: string;
  job: string;
}