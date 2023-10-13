import { Request, Response } from 'express';
import { hashPassword } from '../password';
import { searchUserByUsernameOrEmail } from '../search';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface SignupRequestBody {
  username: string;
  email: string;
  password: string;
}

export const signup = async (
  req: Request<{}, {}, SignupRequestBody>,
  res: Response
) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await searchUserByUsernameOrEmail(username, email);

    if (existingUser) {
      return res.status(409).json({ userExist: true });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ newUser, userExist: false });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).end();
  }
};
