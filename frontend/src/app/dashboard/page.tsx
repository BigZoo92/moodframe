'use client'

import { useEffect } from 'react';
import { userFetch } from '../utils/user/userFetch';
import { useRouter } from 'next/navigation';
import { useStore } from '../store';

export default function Home() {
   const router = useRouter()
    const { setUser, user } = useStore()

  useEffect(() => {
   
    const fetchUser = async () => {
      const userData = await userFetch();
      if(!userData){
        router.push('/')
      }else{
        setUser(userData)
      }
    };

    fetchUser();
  }, []);

  return (
    <main>
      {user && <h1>Wesh{user?.username}</h1>}
    </main>
  );
}
