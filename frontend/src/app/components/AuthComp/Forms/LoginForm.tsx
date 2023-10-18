import React from 'react';
import { useForm } from 'react-hook-form';
import './style.scss';
import { useStore } from '@/app/store';
import { SignupSchemaReturnType } from '@/app/types';
import { authFetch, SignupOrLogin } from '@/app/utils';

export interface AuthFormDataWithoutUsername {
  usernameOrEmail: string;
  password: string;
}

export const LoginForm = () => {

  const { userName  } = useStore();

  const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<AuthFormDataWithoutUsername>();

const onSubmit = async (data: AuthFormDataWithoutUsername) => {
    try {
      const response: SignupSchemaReturnType = await authFetch(data, SignupOrLogin.Signup);
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
          id='usernameOrEmail'
          {...register('usernameOrEmail', { required: 'Username or email is required' })}
          placeholder = 'Username or Email'
          value={userName}
        />
        {errors.usernameOrEmail && <span>{errors.usernameOrEmail.message}</span>}
      </div>
      <div>
        <input
          type='password'
          id='password'
          {...register('password', { required: 'Password is required' })}
          placeholder = 'Password'
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <div className='button_form_switch'>
        <input type='submit' value="Login"/>
        <button>Forgot ?</button>
      </div>
      
    </form>
  )
};

