import bcrypt from 'bcrypt';

// Fonction pour hacher un mot de passe
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; // Nombre de tours de hachage

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    throw error;
  }
};

// Fonction pour vérifier un mot de passe haché avec le mot de passe en clair
export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    throw error;
  }
};
