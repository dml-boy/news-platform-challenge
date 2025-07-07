import { ReactNode } from 'react';
import ClientProviders from '../components/ClientProviders';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className=" ">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}