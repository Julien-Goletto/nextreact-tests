import { render, screen } from '@testing-library/react';
import { describe, test, vi, expect, afterEach } from 'vitest';
import {Geolocation} from '../../components/geolocation/Geolocation';

export const mockLocation = (
  hasAccepted = false, 
  {
    latitude = 100,
    longitude = 100,
  }: {
  latitude?: number;
  longitude?: number;
} = {}) => {
  // 🦁 Créer un fake objet `navigator`
  const fakeNavigator = {
    // Avec une propriété `geolocation`
    geolocation: {
      // Qui contient une méthode `getCurrentPosition`
      // Qui prend en paramètre une fonction `success`
      // Qui prend en paramètre un objet `coords`
      getCurrentPosition: vi.fn((success, error) => {
        hasAccepted 
        ? success({
          coords: {
            latitude,
            longitude,
          }
        })
        : error('An error occured');
      }),
    }
  };
  // 🦁 Stub la propriété `navigator` de l'objet global
  vi.stubGlobal('navigator', fakeNavigator);
};

describe('Geolocation', () => {
  test('geolocation show the latitude and longitude', () => {
    // 🦁 Créer un objet `coords` avec les propriétés `latitude` et `longitude`
    const coords = {
      latitude: 200,
      longitude: 300,
    };
    // 🦁 Appeler la fonction `mockLocation` avec l'objet `coords` en paramètre
    mockLocation(true, coords);
    render(<Geolocation />);
    // 🦁 Vérifier que le texte `Latitude: ${coords.latitude}` est présent ainsi que longitude
    expect(screen.getByText(`Latitude: ${coords.latitude}`)).toBeInTheDocument();
    expect(screen.getByText(`Longitude: ${coords.longitude}`)).toBeInTheDocument();
  });
  test('geolocation is user blocked', () => {
    // 🦁 Appeler la fonction `mockLocation` avec l'objet `coords` en paramètre
    mockLocation();
    render(<Geolocation />);
    expect(screen.getByText('Geolocation is not supported')).toBeInTheDocument();
  });
  afterEach(() => {
    mockLocation();
  });
});
