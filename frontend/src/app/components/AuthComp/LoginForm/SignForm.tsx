import { signup } from '@/app/utils';
import React from 'react';
import { useForm } from 'react-hook-form';
import { SignupSchemaReturnType } from '../../../types';
export interface AuthFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AuthFormData>();

  const confirmPassword = watch('confirmPassword', '');

  const onSubmit = async (data: AuthFormData) => {
    try {
      const response: SignupSchemaReturnType = await signup(data);
      console.log(response)
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type='text'
          id='username'
          {...register('username', { required: 'Username is required' })}
          placeholder='Username'
        />
        {errors.username && <span>{errors.username.message}</span>}
      </div>
      <div>
        <input
          type='email'
          id='email'
          {...register('email', { required: 'Email is required' })}
          placeholder='Email'
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <input
          type='password'
          id='password'
          {...register('password', { required: 'Password is required' })}
          placeholder='Password'
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <div>
        <input
          type='password'
          id='confirmPassword'
          {...register('confirmPassword', {
            required: 'Password confirmation is required',
            validate: (value) => value === confirmPassword || 'Passwords do not match',
          })}
          placeholder='Confirm Password'
        />
        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
      </div>
      <div className='button_form_switch'>
        <input type='submit' value='Login' />
        <button>Forgot?</button>
      </div>
    </form>
  );
};

export default SignForm;
