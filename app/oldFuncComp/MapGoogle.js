import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '975',
  height: '610px',
};
const center = {
  lat: 38,
  lng: -96.3059,
};

const mapOptions = {
  // restriction: {
  //   latLngBounds: {
  //     north: 49.3457868, // North Latitude of the bounding box
  //     south: 24.396308, // South Latitude of the bounding box
  //     west: -125.000000, // West Longitude of the bounding box
  //     east: -66.934570, // East Longitude of the bounding box
  //   },
  //   strictBounds: false, // Set to true if you want to restrict the user from panning outside the bounds
  // },
  styles: [
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#000000' }],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [{ color: '#FFFFFF' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#000000' }],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.fill',
      stylers: [
        {
          visibility: 'on',
          color: '#000000', // Black color for Mexico land
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'on',
          color: '#000000', // Black color for non-Great Lakes water
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'transit',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ],
  zoomControl: false,
  disableDefaultUI: true,
  disableAttribution: true, // Disable attribution (map data) display
  keyboardShortcuts: false, // Disable keyboard shortcuts display

};


const App = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCWLQ35hGBercZ49EJSaqmq_H_4IUtNXXk', // Replace with your Google Maps API key
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={4.75}
        center={center}
        options={mapOptions}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default App;
