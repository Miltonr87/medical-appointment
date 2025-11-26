import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // caminho ajustado
import { TooltipProvider } from '../src/components/ui/tooltip';
import { Toaster } from '../src/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Medical Appointment - Agende sua Consulta',
  description: 'Agende sua consulta médica de forma simples e rápida',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
