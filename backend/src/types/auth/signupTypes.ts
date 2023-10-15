import {z} from 'zod'

// Schéma de validation pour les données d'inscription
export const SignupSchema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(4),
});

export type SignupSchemaType = z.TypeOf<typeof SignupSchema>;

export interface SignupSchemaReturnType {
  user: SignupSchemaType;
  userExist: boolean;
}

