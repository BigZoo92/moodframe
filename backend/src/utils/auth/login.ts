import { Request, Response } from 'express';
import { comparePasswords } from '../password'; // Assurez-vous d'avoir une fonction de comparaison de mot de passe
import { searchUserByUsernameOrEmail } from '../search';
import { AuthSchema, AuthSchemaType } from '../../types';


export const signin = async (req: Request<{}, {}, AuthSchemaType>, res: Response) => {
  const { username, email, password }: AuthSchemaType = req.body;

  try {
    AuthSchema.parse({
      username,
      email,
      password,
    });

    const user = await searchUserByUsernameOrEmail(email);

    if (!user) {
      return res.status(401).json({ user: null, userExist: false });
    }

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ user: user, userExist: false });
    }
    req.session.user = user;
    res.status(200).json({ user: user, userExist: true });
  } catch (error: any) {
    console.error("Erreur lors de l'authentification :", error.errors);
    res
      .status(400)
      .json({ message: 'Validation failed', errors: error.errors });
  }
};
