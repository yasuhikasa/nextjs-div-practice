import React, { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { GetServerSideProps } from 'next';
import { withSSRContext } from 'aws-amplify';
import axios from 'axios';


// getServerSidePropsがSSR（サーバサイドレンダリング）を実行し、
// 既にログインしているユーザーがこのサインアップページを訪れた場合、ホームページにリダイレクト

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { Auth } = withSSRContext(context);
  try {
    const user = await Auth.currentAuthenticatedUser();
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  } catch (err) {
    return {
      props: {}, // ログインしていない場合は何も返さない
    }
  }
};


//サインアップ機能の実装

interface ISignUpFormInputs {
  id?: string | number;
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
  skills: string[];
}

interface ISkill {
  skillName: string;
}

const SignUp: React.FC = () => {
  const [signUpError, setSignUpError] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm<ISignUpFormInputs>();

  // 配列でスキルを管理するためのuseState
  const [skills, setSkills] = useState<ISkill[]>([]);

  // バックエンドでcognitoと連携し、DBにユーザー情報を保存する場合は下でコメントアウトしているonSubmitではなく
  // 普通のREST APIを作成して、そのAPIを呼び出すようにする。
  // ここではバックエンドでの処理を前提としているので、axiosを使ってバックエンドのAPIを呼び出している。
  const onSubmit = async (data: ISignUpFormInputs) => {
    try {
      const response = await axios.post('/api/signup', data);
      const user = response.data;
      console.log(user);
    } catch (error) {
      console.error('Error signing up:', error);
      if (error instanceof Error) {
          setSignUpError(error.message || 'An error occurred during sign up');
      } else {
          setSignUpError('An error occurred during sign up');
      }
    }
  };

  // ユーザーがスキルを選択できるようにするため、バックエンドのskillsテーブルからスキルの一覧を取得している。
  useEffect(() => {
    const getSkills = async () => {
      try {
        const response = await axios.get('/api/skills');
        setSkills(response.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    getSkills();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        type="email"
        placeholder="Email"
      />
      {errors.email && <p>Email is required</p>}

      <input
        {...register("firstName", { required: true })}
        type="text"
        placeholder="First Name"
      />
      {errors.firstName && <p>First Name is required</p>}

      <input
        {...register("lastName", { required: true })}
        type="text"
        placeholder="Last Name"
      />
      {errors.lastName && <p>Last Name is required</p>}

      <input
        {...register("firstNameKana", { required: true })}
        type="text"
        placeholder="First Name Kana"
      />
      {errors.firstNameKana && <p>First Name Kana is required</p>}

      <input
        {...register("lastNameKana", { required: true })}
        type="text"
        placeholder="Last Name Kana"
      />
      {errors.lastNameKana && <p>Last Name Kana is required</p>}

      <input
        {...register("phone", { required: true })}
        type="tel"
        placeholder="Phone Number"
      />
      {errors.phone && <p>Phone Number is required</p>}

      <select {...register("job", { required: true })}>
        <option value="">Select Job</option>
        <option value="student">Student</option>
        <option value="engineer">Engineer</option>
        <option value="teacher">Teacher</option>
        <option value="artist">Artist</option>
      </select>
      {errors.job && <p>Job is required</p>}

      <div>
        <label htmlFor="male">Male</label>
        <input
          {...register("gender", { required: true })}
          type="radio"
          value="male"
          id="male"
        />

        <label htmlFor="female">Female</label>
        <input
          {...register("gender", { required: true })}
          type="radio"
          value="female"
          id="female"
        />
      </div>
      {errors.gender && <p>Gender selection is required</p>}

      <input
      {...register("dateOfBirth", { required: true })}
      type="date"
      placeholder="Date of Birth"
    />
    {errors.dateOfBirth && <p>Date of Birth is required</p>}
    <div>
      {skills.map((skill, index) => (
          <div key={index}>
            <label>{skill.skillName}</label>
            <input type="checkbox" value={skill.skillName} {...register("skills")} />
          </div>
        ))}
      {errors.skills && <p>Please select at least one skill</p>}
    </div>
      <div>
        <button type="submit">Sign Up</button>
      </div>
    </form>
  );
};

export default SignUp;



// const onSubmit = async (data: ISignUpFormInputs) => {
//   try {
//     const { user } = await Auth.signUp({
//       username: data.email,
//       password: '', // No password is provided, AWS Cognito will generate a temporary one
//       attributes: {
//         email: data.email,
//         given_name: data.firstName,
//         family_name: data.lastName,
//       }
//     });
//     console.log(user);
//   } catch (error) {
//     console.error('Error signing up:', error);
//     if (error instanceof Error) {
//       setSignUpError(error.message || 'An error occurred during sign up');
//     } else {
//       setSignUpError('An error occurred during sign up');
//     }
//   }
// };




// import React, { useState } from 'react';
// import { Auth } from '@aws-amplify/auth';

// const SignUp: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     try {
//       const { user } = await Auth.signUp({
//         username: email,
//         password,
//         attributes: {
//           email
//         }
//       });
//       console.log(user);
//     } catch (error) {
//       console.error('Error signing up:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         value={email}
//         onChange={e => setEmail(e.target.value)}
//         placeholder="Email"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//         placeholder="Password"
//       />
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// };

// export default SignUp;

