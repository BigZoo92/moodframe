// Dans un fichier utilisateur, par exemple, dbUtils.ts dans le dossier utils.
import { db } from '../dbconfig'; // Assurez-vous que le chemin vers votre fichier de configuration de base de données est correct.

/**
 * Recherche un utilisateur par nom d'utilisateur ou adresse e-mail.
 * @param {string} username - Le nom d'utilisateur à rechercher.
 * @param {string} email - L'adresse e-mail à rechercher.
 * @returns {Promise<Object|null>} - L'utilisateur trouvé ou null s'il n'existe pas.
 */
export async function searchUserByUsernameOrEmail(
  username: string,
  email: string
): Promise<any | null> {
  try {
    // Effectuez une recherche dans la base de données en utilisant le nom d'utilisateur ou l'adresse e-mail.
    // Assurez-vous que votre requête SQL correspond à la structure de votre base de données.
    const user = await db.oneOrNone(
      'SELECT * FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );

    // Renvoyez l'utilisateur trouvé ou null s'il n'existe pas.
    return user;
  } catch (error) {
    // Gérez les erreurs ici en fonction de votre configuration de gestion des erreurs.
    console.error(
      "Erreur lors de la recherche d'utilisateur existant :",
      error
    );
    throw error;
  }
}
