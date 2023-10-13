import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function searchUserByUsernameOrEmail(
  username: string,
  email: string
): Promise<any | null> {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: { equals: username } }, { email: { equals: email } }],
      },
    });
    return user || null;
  } catch (error) {
    console.error(
      "Erreur lors de la recherche d'utilisateur existant :",
      error
    );
    throw error;
  }
}
