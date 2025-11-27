import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { ReactQueryProvider } from './ReactQueryProvider';

// Toastify (Sonner)
import { Toaster as Sonner } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Medical Appointment - Agende sua Consulta',
  description: 'Agende sua consulta médica de forma simples e rápida',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ReactQueryProvider>
          <TooltipProvider>
            {children}
            <Sonner />
            <Toaster />
          </TooltipProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
