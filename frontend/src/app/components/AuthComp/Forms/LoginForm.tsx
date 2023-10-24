import React from 'react';
import { useForm } from 'react-hook-form';
import './style.scss';
import { useRouter } from 'next/navigation'

import { useStore } from '@/app/store';
import { AuthSchemaReturnType } from '@/app/types';
import { authFetch, SignupOrLogin } from '@/app/utils';

export interface AuthFormDataWithoutUsername {
  usernameOrEmail: string;
  password: string;
}

export const LoginForm = () => {

  const { userName, setUser  } = useStore();
  const router = useRouter()

  const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<AuthFormDataWithoutUsername>();

const onSubmit = async (data: AuthFormDataWithoutUsername) => {
    try {
      const response: AuthSchemaReturnType = await authFetch(data, SignupOrLogin.Login);
      if(response.userExist){
        setUser(response.user)
        router.push('/dashboard')
      }
      console.log(response)
    } catch (error) {
      console.error("Erreur lors de l'inscription 5:", error);
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
          defaultValue={userName}
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

