import { Request, Response } from 'express';
import { hashPassword } from '../password';
import { searchUserByUsernameOrEmail } from '../search';
import { PrismaClient } from '@prisma/client';
import { SignupSchema, SignupSchemaType } from '../../types';

const prisma = new PrismaClient();

export const signup = async (
  req: Request<{}, {}, SignupSchemaType>,
  res: Response
) => {
  const { username, email, password }: SignupSchemaType = req.body;

  try {
    // Valider les données avec Zod
    SignupSchema.parse({
      username,
      email,
      password,
    });

    const existingUser = await searchUserByUsernameOrEmail(username, email);

    if (existingUser) {
      return res.status(409).json({ user: existingUser, userExist: true });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ user: newUser, userExist: false });
  } catch (error: any) {
    console.error("Erreur lors de l'inscription :", error.errors);
    res
      .status(400)
      .json({ message: 'Validation failed', errors: error.errors });
  }
};
