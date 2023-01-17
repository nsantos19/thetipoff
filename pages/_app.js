import '../styles.css'
import React from 'react'
import { UserProvider } from '@auth0/nextjs-auth0/client';

import {Roboto_Serif} from '@next/font/google'



const inter = Roboto_Serif({subsets: ['latin'],style:['normal','italic']})
  
// This default export is required in a new `pages/_app.js` file.
//
export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <main className={inter.className}>
      <Component {...pageProps} />
      </main>
    </UserProvider>
  );
}
