import '../styles.css'
import React from 'react'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import {Roboto_Serif} from '@next/font/google'
import Head from 'next/head';
import Script from 'next/script';


const inter = Roboto_Serif({subsets: ['latin'],style:['normal','italic']})
  
// This default export is required in a new `pages/_app.js` file.
//
export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
<Script strategy='lazyOnLoad' src="https://www.googletagmanager.com/gtag/js?id=G-H20SXX1W9E"/>
<Script>
{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-H20SXX1W9E',{
  page_path: window.location.pathname,
});

`}
</Script>
<Head>
<title> Tipoff Blog </title>
<Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5843940194786231"
     crossorigin="anonymous"></Script>
</Head>
      <main className={inter.className }>
      <Component {...pageProps} />
      </main>
    </UserProvider>
  );
}
