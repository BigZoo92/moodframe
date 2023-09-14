import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './style.scss';

interface AuthFormData {
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

  const onSubmit: SubmitHandler<AuthFormData> = (data) => {
    console.log(data);
  };

  const confirmPassword = watch('confirmPassword', '');

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
          {...register('email')}
          placeholder='Email'
        />
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
            validate: (value) =>
              value === confirmPassword || 'Passwords do not match',
          })}
          placeholder='Confirm Password'
        />
        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
      </div>
      <div className='button_form_switch'>
        <button type='submit'>Sign In</button>
        <button>Forgot ?</button>
      </div>
    </form>
  );
};

export default SignForm;
