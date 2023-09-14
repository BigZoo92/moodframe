'use client'

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { FrontProvider } from './contexts/providers/FrontProvider';
import './style.css';
import type { Metadata } from 'next';

// Créez une instance d'Apollo Client avec l'URL de votre serveur GraphQL
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  credentials: 'include', // Définissez cette option sur "include"
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ApolloProvider client={client}>
          <FrontProvider>
            <Header></Header>
            {children}
            <Footer></Footer>
          </FrontProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
