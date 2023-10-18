import {z} from 'zod'

export const AuthSchema = z.object({
  id: z.number(),
  username: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(4),
});

export type AuthSchemaType = z.TypeOf<typeof AuthSchema>;

export interface AuthSchemaReturnType {
  user: AuthSchemaType;
  userExist: boolean;
}

