import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Users } from '../../types/users';
import { NextPage } from 'next';

const SimpleSignup:NextPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Users>();


  const onSubmit = async (data: Users) => {
    try {
      const response = await axios.post('http://localhost:4000/simpleLogin/signup', data);
      // handle the response
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div>サインアップ</div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        type="email"
        placeholder="Email"
      />
      {errors.email && <p>Email is required</p>}
      <input
        {...register("user_password", { required: true })}
        type="text"
        placeholder="password"
      />

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

        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default SimpleSignup;
