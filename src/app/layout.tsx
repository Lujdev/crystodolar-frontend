import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CryptoContextProvider } from "@/lib/crypto-context";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
});

export const metadata: Metadata = {
  title: "CrystoDolar - Cotizaciones USDT/Bs en Tiempo Real",
  description: "Consulta las cotizaciones de USDT en bolívares venezolanos. Tasa oficial BCV y mercado crypto Binance P2P",
};

/**
 * Layout principal de CrystoDolar
 * Incluye el proveedor CryptoContext para estado global de cotizaciones USDT/Bs
 * Configurado para mercado fiat/crypto venezolano
 * Integrado con Vercel Speed Insights para monitoreo de rendimiento
 * Optimizado para eliminar solicitudes CSS que bloquean el renderizado
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Preload de fuentes críticas para mejorar FCP */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* DNS prefetch para recursos externos */}
        <link rel="dns-prefetch" href="//cdn.crystodolarvzla.site" />
        <link rel="dns-prefetch" href="//crystodolar-api-production.up.railway.app" />
      </head>
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
          <SpeedInsights />
        </div>
        
        {/* Script de optimizaciones de rendimiento */}
        <Script
          id="performance-optimizations"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Inicializar optimizaciones de rendimiento
              (function() {
                // Optimizar carga de fuentes
                const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
                fontLinks.forEach(link => {
                  if (link instanceof HTMLLinkElement) {
                    link.setAttribute('media', 'print');
                    link.setAttribute('onload', "this.media='all'");
                  }
                });
                
                // Optimizar imágenes
                const images = document.querySelectorAll('img');
                images.forEach(img => {
                  if (!img.classList.contains('critical-image')) {
                    img.loading = 'lazy';
                  }
                  img.decoding = 'async';
                });
                
                // Reportar métricas de rendimiento
                if ('performance' in window) {
                  new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    console.log('LCP:', lastEntry.startTime);
                  }).observe({ entryTypes: ['largest-contentful-paint'] });
                }
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
