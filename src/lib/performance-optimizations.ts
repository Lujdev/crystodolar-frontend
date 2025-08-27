/**
 * Optimizaciones de rendimiento para CrystoDolar
 * Enfocado en eliminar solicitudes CSS que bloquean el renderizado
 */

// Configuración de preload para recursos críticos
export const preloadCriticalResources = () => {
  // Preload de fuentes críticas
  const fontPreload = document.createElement('link');
  fontPreload.rel = 'preload';
  fontPreload.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  fontPreload.as = 'style';
  document.head.appendChild(fontPreload);

  // Preload de CSS crítico
  const cssPreload = document.createElement('link');
  cssPreload.rel = 'preload';
  cssPreload.href = '/_next/static/css/app/layout.css';
  cssPreload.as = 'style';
  document.head.appendChild(cssPreload);
};

// Función para cargar CSS de forma no bloqueante
export const loadNonBlockingCSS = (href: string) => {
  return new Promise<void>((resolve) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = () => resolve();
    link.onerror = () => resolve(); // Resolver incluso si falla
    document.head.appendChild(link);
  });
};

// Función para optimizar la carga de fuentes
export const optimizeFontLoading = () => {
  // Agregar display=swap para fuentes
  const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
  fontLinks.forEach(link => {
    if (link instanceof HTMLLinkElement) {
      link.setAttribute('media', 'print');
      link.setAttribute('onload', "this.media='all'");
    }
  });
};

// Función para detectar y reportar métricas de rendimiento
export const reportPerformanceMetrics = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Reportar LCP (Largest Contentful Paint)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Reportar FCP (First Contentful Paint)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const firstEntry = entries[0];
      console.log('FCP:', firstEntry.startTime);
    }).observe({ entryTypes: ['first-contentful-paint'] });

    // Reportar CLS (Cumulative Layout Shift)
    new PerformanceObserver((entryList) => {
      let clsValue = 0;
      for (const entry of entryList.getEntries()) {
        // TypeScript safe access to layout-shift specific properties
        const layoutShiftEntry = entry as PerformanceEntry & {
          hadRecentInput?: boolean;
          value?: number;
        };
        if (!layoutShiftEntry.hadRecentInput) {
          clsValue += layoutShiftEntry.value || 0;
        }
      }
      console.log('CLS:', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }
};

// Función para optimizar imágenes
export const optimizeImages = () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    // Agregar loading lazy para imágenes no críticas
    if (!img.classList.contains('critical-image')) {
      img.loading = 'lazy';
    }
    
    // Agregar decoding async
    img.decoding = 'async';
  });
};

// Función para inicializar todas las optimizaciones
export const initializePerformanceOptimizations = () => {
  if (typeof window !== 'undefined') {
    // Ejecutar optimizaciones después de que la página esté lista
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        preloadCriticalResources();
        optimizeFontLoading();
        optimizeImages();
        reportPerformanceMetrics();
      });
    } else {
      preloadCriticalResources();
      optimizeFontLoading();
      optimizeImages();
      reportPerformanceMetrics();
    }
  }
};
