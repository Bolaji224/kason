// src/components/MapComponent.tsx
import React from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const MapComponent: React.FC = () => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
      <LoadScript
        googleMapsApiKey="YOUR_API_KEY" // Replace with your API key
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default MapComponent;
