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
// TODO: Revisar el 'use client' de todos los componentes.
// TODO: Revisar todos los textos
// TODO: Hacer el readme
// TODO: Mirar como reaccionar cuando se elimina una playlist
// TODO: Revisar la estructura del proyecto.
// TODO: Revisar las modales ya que algunas no funcionan bien.
// TODO: Revisar todos los imports.
// TODO: Revisar console.logs
// TODO: Adicionar imagen cuando no esta disponible
// TODO: Revisar el scrollbar
// TODO: Corregir pagina de playlsit.
// TODO: Implementar el searchbar
// TODO: Refactorizar ondubmit
//  TODO: Mirar que si una imporacion se esta usando en mas de un lugar no este metido en una carpeta
// TODO: Implementar botones de eliminar playlist y eliminar cancion.
// REvsar si los useCallback si son necesarios y mirar useMemo tambien
// TODO: Revisar que las imagenes no tengan error si no viene un url para el src
