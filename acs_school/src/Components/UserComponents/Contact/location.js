import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { option } from './snazyMaps'

const libraries = ['places'];
const mapContainerStyle = {
    width: '250px',
    height: '250px',
}
const center = {
    lat: 34.588773,
    lng: 36.343433
};
const Option = {
    styles: option
}
export function Location() {

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAcmSdtE6C_Zcc0fOHS53cLzcU1OpAYaDI',
        libraries,
    })

    if (loadError) return 'Error loading Google Maps';
    if (!isLoaded) return 'Loading Google Maps';

    return (
        <div style={{ marginTop: '100px', marginLeft: '20px', marginBottom: '20px' }}>
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={13} center={center} options={Option}>
                <Marker position={{ lat: 34.588773, lng: 36.343433 }} />
            </GoogleMap>
        </div>
    )
}