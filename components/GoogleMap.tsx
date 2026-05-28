'use client';

import { useEffect, useRef, useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

interface GoogleMapProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  address: string;
}

const MapComponent: React.FC<GoogleMapProps> = ({ center, zoom, address }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (ref.current && !map) {
      const mapInstance = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry.fill',
            stylers: [{ color: '#f0f9ff' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#e0f2fe' }]
          },
          {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [{ color: '#f0fdf4' }]
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{ color: '#f0fdf4' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#ffffff' }]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#166534' }]
          }
        ]
      });
      setMap(mapInstance);
    }
  }, [ref, map, center, zoom]);

  useEffect(() => {
    if (map && !marker) {
      const markerInstance = new window.google.maps.Marker({
        position: center,
        map,
        title: 'Crop Care Office',
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#16a34a" stroke="#ffffff" stroke-width="4"/>
              <path d="M20 8C15.58 8 12 11.58 12 16C12 22 20 32 20 32C20 32 28 22 28 16C28 11.58 24.42 8 20 8Z" fill="#ffffff"/>
              <circle cx="20" cy="16" r="4" fill="#16a34a"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(40, 40),
          anchor: new window.google.maps.Point(20, 40)
        }
      });
      setMarker(markerInstance);

      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 250px;">
            <h3 style="margin: 0 0 8px 0; color: #16a34a; font-size: 16px; font-weight: bold;">Crop Care Office</h3>
            <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.4;">${address}</p>
            <div style="margin-top: 8px;">
              <a href="https://maps.google.com/?q=${encodeURIComponent(address)}" 
                 target="_blank" 
                 style="color: #16a34a; text-decoration: none; font-size: 12px;">
                View on Google Maps →
              </a>
            </div>
          </div>
        `
      });

      markerInstance.addListener('click', () => {
        infoWindow.open(map, markerInstance);
      });
    }
  }, [map, marker, center, address]);

  return <div ref={ref} className="w-full h-full rounded-2xl" />;
};

const LoadingComponent = () => (
  <div className="w-full h-96 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
      <p className="text-green-700 font-medium">Loading map...</p>
    </div>
  </div>
);

const ErrorComponent = ({ status }: { status: Status }) => (
  <div className="w-full h-96 bg-red-50 rounded-2xl flex items-center justify-center">
    <div className="text-center">
      <MapPin className="h-16 w-16 text-red-500 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-red-700 mb-2">Map Error</h3>
      <p className="text-red-600">Failed to load map: {status}</p>
    </div>
  </div>
);

export const GoogleMap: React.FC<GoogleMapProps> = ({ center, zoom, address }) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // In a real app, you'd get this from environment variables
    // For demo purposes, we'll use a placeholder
    setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '');
  }, []);

  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <LoadingComponent />;
      case Status.FAILURE:
        return <ErrorComponent status={status} />;
      case Status.SUCCESS:
        return <MapComponent center={center} zoom={zoom} address={address} />;
    }
  };

  // Show loading state during SSR
  if (!isClient) {
    return <LoadingComponent />;
  }

  if (!apiKey) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="p-6 text-center">
            <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Map</h3>
            <p className="text-gray-600 mb-4">{address}</p>
            <div className="space-y-2">
              <Button 
                onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, '_blank')}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in Google Maps
              </Button>
              <Button 
                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`, '_blank')}
                variant="outline"
                className="w-full border-green-300 text-green-700 hover:bg-green-50"
              >
                <Navigation className="h-4 w-4 mr-2" />
                Get Directions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Wrapper apiKey={apiKey} render={render} />
  );
};
