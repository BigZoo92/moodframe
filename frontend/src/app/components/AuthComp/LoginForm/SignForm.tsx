import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { useRouter } from 'next/router';
import { useMutation, gql, useApolloClient } from '@apollo/client';
import './style.scss';
import { useFrontContext } from '@/app/contexts/FrontContext';

interface AuthFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    registerUser(username: $username, email: $email, password: $password) {
      user_id
      username
      email
    }
  }
`;

const CHECK_USER_EXIST = gql`
  query CheckUserExist($username: String, $email: String) {
    checkUserExists(username: $username, email: $email)
  }
`;



const SignForm = () => {
  const [registerUser] = useMutation(REGISTER_USER);
  const { setIsUserExists, setUserName  } = useFrontContext();
  const client = useApolloClient(); // Utilisez useApolloClient pour obtenir le client Apollo
  // const router = useRouter(); // Récupérez l'objet de routage


  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, 
  } = useForm<AuthFormData>();

const onSubmit = async (data: any) => {
  const { username, email, password } = data;

  const checkUserResponse = await client.query({
  query: CHECK_USER_EXIST,
  variables: { username, email },
});

if (checkUserResponse.data.checkUserExists) {
    // L'utilisateur existe déjà, vous pouvez afficher un message d'erreur ou prendre d'autres mesures.
    alert('WEEEESH T DEJA INSCRIT PELO')
    setUserName(username)
    setIsUserExists(true);
    return;
  }


  try {
    const response = await registerUser({
      variables: {
        username: username,
        email: email,
        password: password,
      },
    });

    if (response.data && response.data.registerUser) {
      // router.push('/dashboard');
    } else {
      // La mutation a échoué
      console.error("L'inscription a échoué:", response.errors);
    }
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
  }
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
            validate: (value) =>
              value === confirmPassword || 'Passwords do not match',
          })}
          placeholder='Confirm Password'
        />
        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
      </div>
      <div className='button_form_switch'>
        <input type='submit' value="login"/>
        <button>Forgot ?</button>
      </div>
    </form>
  );
};

export default SignForm;
