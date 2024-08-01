import { ReactNode } from 'react';
import { getUser, redirectToLogin } from '../utils/auth';

export default async function RootLayout({ children }: { children: ReactNode }) {
  const user = await getUser();

  // You might handle redirection here using server-side checks if needed
  // Or manage redirection within the client component

  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
