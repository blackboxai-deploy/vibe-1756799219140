import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tic-Tac-Toe Game',
  description: 'A modern Tic-Tac-Toe game built with Next.js, featuring smooth animations and AI opponent',
  keywords: 'tic-tac-toe, game, react, nextjs, typescript, ai',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}