import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CryptoContextProvider } from "@/lib/crypto-context";
import { Toaster } from "sonner";

const inter = Inter({ 
  subsets: ["latin"], 
  display: "swap",
  preload: true,
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "CrystoDolar - Cotizaciones USDT/Bs en Tiempo Real",
  description: "Consulta las cotizaciones de USDT en bolívares venezolanos. Tasa oficial BCV y mercado crypto Binance P2P",
  keywords: "USDT, bolívares, Venezuela, BCV, crypto, cotización, dólar",
  authors: [{ name: "CrystoDolar" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "CrystoDolar - Cotizaciones USDT/Bs",
    description: "Cotizaciones en tiempo real de USDT en bolívares venezolanos",
    type: "website",
    locale: "es_VE",
  },
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
    <html lang="es" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" as="style" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" media="print" onLoad={(e) => {(e.target as HTMLLinkElement).media = 'all'}} />
        <noscript>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
        </noscript>
        <link rel="preconnect" href="https://crystodolar-api-production.up.railway.app" />
        <link rel="preconnect" href="https://cdn.crystodolarvzla.site" />
        <link rel="preconnect" href="https://api.binance.com" />
        <link rel="preconnect" href="https://www.bcv.org.ve" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://cdn.crystodolarvzla.site" />
        <link rel="dns-prefetch" href="https://api.binance.com" />
        <link rel="dns-prefetch" href="https://www.bcv.org.ve" />
      </head>
      <body className={`${inter.className} antialiased font-sans`}>
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
