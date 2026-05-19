import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const MapaLeaflet = ({ coordinates }) =>
{
    return (
        <MapContainer center={coordinates} zoom={13} style={{ height: 300, width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={coordinates} />
        </MapContainer>
    );
};

export default MapaLeaflet;
