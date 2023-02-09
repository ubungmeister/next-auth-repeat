import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Menu from "@/components/layout/Menu";
import {SessionProvider} from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <SessionProvider session={pageProps}>
          <Menu/>
        <Component {...pageProps} />

      </SessionProvider>
  )
}
