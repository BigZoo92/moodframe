import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, gql } from '@apollo/client';
import './style.scss';

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


const SignForm = () => {
  const [registerUser] = useMutation(REGISTER_USER);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, 
  } = useForm<AuthFormData>();

const onSubmit = async (data: any) => {
  console.log('hello world');

  try {
    const response = await registerUser({
      variables: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    });

    console.log('Mutation exécutée avec succès'); // Ajoutez cette ligne

    if (response.data && response.data.registerUser) {
      // La mutation a réussi, vous pouvez prendre des mesures ici
      console.log(
        'Utilisateur inscrit avec succès:',
        response.data.registerUser
      );
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
