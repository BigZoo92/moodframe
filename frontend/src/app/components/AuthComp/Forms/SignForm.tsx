import { SignupOrLogin, authFetch } from '@/app/utils';
import React from 'react';
import { useForm } from 'react-hook-form';
import { AuthSchemaReturnType } from '../../../types';
import Link from 'next/link'

export interface AuthFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AuthFormData>();

  const confirmPassword = watch('confirmPassword', '');

  const onSubmit = async (data: AuthFormData) => {
    try {
      const response: AuthSchemaReturnType = await authFetch(data, SignupOrLogin.Signup);
    } catch (error) {
      console.error("Erreur lors de l'inscription 4:", error);
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
        <input type='submit' value='Signup' />
        <button>Forgot?</button>
      </div>
      <span className='hr'></span>
      <Link href={'http://localhost:4000/api/auth/google'} className='google_connect'>
        <label>Sign Up with Google</label>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
          <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"></path><path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"></path><polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon><path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"></path><path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"></path>
        </svg>
      </Link>
    </form>
  );
};

