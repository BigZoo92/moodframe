import {
  AuthFormData,
  AuthFormDataWithoutUsername,
} from '@/app/components/AuthComp/Forms';
import { SignupSchema, SignupSchemaReturnType } from '../../types';

export enum SignupOrLogin {
  Signup = 'signup',
  Login = 'Login',
}

export const authFetch = async (
  data: AuthFormData | AuthFormDataWithoutUsername,
  urlToFetch: SignupOrLogin
): Promise<SignupSchemaReturnType> => {
  try {
    SignupSchema.parse(data);
    const url = `http://localhost:4000/api/auth/${urlToFetch}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result: SignupSchemaReturnType = await response.json();

      if (result.userExist) {
        console.log('Utilisateur existe déjà :', result.user);
        return { user: null, userExist: true };
      } else {
        console.log('Utilisateur enregistré avec succès :', result.user);
        return { user: result.user, userExist: false };
      }
    } else {
      const errorData = await response.json();
      console.error("Erreur lors de l'inscription :", errorData);
      return { user: null, userExist: false };
    }
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    return { user: null, userExist: false };
  }
};
