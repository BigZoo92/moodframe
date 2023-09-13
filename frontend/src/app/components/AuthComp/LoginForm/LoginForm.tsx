import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './style.scss';

interface AuthFormData {
  usernameOrEmail: string;
  password: string;
}

const LoginForm = () => {
  const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<AuthFormData>();

const onSubmit: SubmitHandler<AuthFormData> = (data) => {
  console.log(data); 
};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type='text'
          id='usernameOrEmail'
          {...register('usernameOrEmail', { required: 'Username or email is required' })}
          placeholder = 'Username or Email'
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
      <div>
        <button type='submit'>Log In</button>
        <button>Forgot ?</button>
      </div>
      
    </form>
  )
};

export default LoginForm;
