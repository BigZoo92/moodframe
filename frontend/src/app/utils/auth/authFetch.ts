import {
  AuthFormData,
  AuthFormDataWithoutUsername,
} from '@/app/components/AuthComp/Forms';
import { SignupSchema, AuthSchemaReturnType, LoginSchema } from '../../types';

export enum SignupOrLogin {
  Signup = 'signup',
  Login = 'Login',
}

export const authFetch = async (
  data: AuthFormData | AuthFormDataWithoutUsername,
  urlToFetch: SignupOrLogin
): Promise<AuthSchemaReturnType> => {
  try {
    urlToFetch === SignupOrLogin.Signup
      ? SignupSchema.parse(data)
      : LoginSchema.parse(data);
    const url = `http://localhost:4000/api/auth/${urlToFetch}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log(response)
    if (response.ok) {
      const result: AuthSchemaReturnType = await response.json();
      if (result.userExist) {
        return { user: result.user, userExist: true };
      } else {
        return { user: result.user, userExist: false };
      } 
    } else {
      const errorData = await response.json();
      console.error("Erreur lors de l'inscription 1 :", errorData);
      return { user: null, userExist: false };
    }
  } catch (error) {
    console.error("Erreur lors de l'inscription 2 :", error);
    return { user: null, userExist: false };
  }
};
