import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ViewTransitions } from 'next-view-transitions';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}

// TODO: Mirar que todos los estilos tengan sentido, quitando etiquetas que no deberian estar o poniendo algo mas semantico. Tambien revisar que todos los estilos tengan sentido y que al separarse en componentes no queden estilos que dependan de un padre.
// TODO: Mirar las etiquetas img y optimizar imagenes si es necesario.
// TODO: Poner a los elementos cuyo texto es muy largo la propiedad title.
// TODO: Cambiar view transitions
// TODO: Revisar el responsive de todas las paginas.
// TODO: Hacer que los botones de + sean para crear una lista desde cero
// TODO: Revisar el 'use client' de todos los componentes.
// TODO: Revisar todos los textos
// TODO: Hacer el readme
