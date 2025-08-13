import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CryptoContextProvider } from "@/lib/crypto-context";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CrystoDolar - Cotizaciones USDT/Bs en Tiempo Real",
  description: "Consulta las cotizaciones de USDT en bolívares venezolanos. Tasa oficial BCV y mercado crypto Binance P2P",
};

/**
 * Layout principal de CrystoDolar
 * Incluye el proveedor CryptoContext para estado global de cotizaciones USDT/Bs
 * Configurado para mercado fiat/crypto venezolano
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gray-900">
          <CryptoContextProvider>
            {children}
          </CryptoContextProvider>
          <Toaster 
            position="top-center" 
            richColors 
            closeButton
            duration={3000}
          />
        </div>
      </body>
    </html>
  );
}
