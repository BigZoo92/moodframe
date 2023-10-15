import { AuthFormData } from '@/app/components/AuthComp/LoginForm/SignForm';
import { SignupSchema, SignupSchemaReturnType } from '../../types';

export const signup = async (
  data: AuthFormData
): Promise<SignupSchemaReturnType> => {
  try {
    // Valider les données avec Zod
    SignupSchema.parse(data);

    const response = await fetch('http://localhost:4000/api/auth/signup', {
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
