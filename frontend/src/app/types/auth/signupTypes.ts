import {z} from 'zod'

export const SignupSchema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(4),
});

export type SignupSchemaType = z.TypeOf<typeof SignupSchema>;

export interface SignupSchemaReturnType {
  user: SignupSchemaType | null;
  userExist: boolean;
}
