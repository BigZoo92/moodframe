import { AuthSchemaType } from "@/app/types";

export const userFetch = async (): Promise<AuthSchemaType | undefined> => {
  try {
    const url = `http://localhost:4000/api/info/user`;
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: AuthSchemaType | undefined = await response.json();
    return data
  } catch (error) {
    console.log(error);
  }
};
