// GoogleMapsLoader.ts
declare global {
    interface Window {
      google: any;
    }
  }
  
  let googleMapsPromise: Promise<void>;
  
  export const loadGoogleMaps = (apiKey: string): Promise<void> => {
    if (!googleMapsPromise) {
      googleMapsPromise = new Promise<void>((resolve) => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          window.google = window.google || {};
          resolve();
        };
        document.head.appendChild(script);
      });
    }
    return googleMapsPromise;
  };
  