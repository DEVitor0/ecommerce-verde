'use client';

import { ReactNode } from 'react';
import { AppProviders } from '@/providers/providers';
import Script from 'next/script';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Mali:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&family=Montserrat:ital,wght@0,299;1,299&family=Open+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <Script 
          src="https://kit.fontawesome.com/040ec7ddb7.js" 
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        <style jsx global>{`
          @keyframes slideDireita {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(0);
            }
          }

          @keyframes slideEsquerda {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(0);
            }
          }

          .direita .produtos-plantas {
            animation: slideDireita 0.260s ease forwards;
          }

          .esquerda .produtos-plantas {
            animation: slideEsquerda 0.260s ease forwards;
          }
        `}</style>
      </head>
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
