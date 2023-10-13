import { AuthFormData } from "@/app/components/AuthComp/LoginForm/SignForm";

export const signup = async (data: AuthFormData) => {
  try {
    const response = await fetch('http://localhost:4000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
  }
};
