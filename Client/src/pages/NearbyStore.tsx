import React, { useState } from 'react';
import axios from 'axios';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const NearbyStore: React.FC = () => {
    const [address, setAddress] = useState('');
    const [stores, setStores] = useState<any[]>([]);
    const [location, setLocation] = useState({ lat: 0, lng: 0 });

    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const geocodeResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
                params: {
                    address: address,
                    key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
                }
            });
            const location = geocodeResponse.data.results[0].geometry.location;
            setLocation(location);

            const placesResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
                params: {
                    location: `${location.lat},${location.lng}`,
                    radius: 1500,
                    type: 'grocery_or_supermarket',
                    key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
                }
            });
            setStores(placesResponse.data.results);
        } catch (error) {
            console.error('Error fetching data from Google Maps API:', error);
        }
    };

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}>
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
                <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
                    <div className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl max-w-2xl w-full text-center">
                        <h1 className="text-4xl font-bold text-gray-800 py-6 mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                            Find Nearby Grocery Stores
                        </h1>
                        <input
                            type="text"
                            value={address}
                            onChange={handleAddressChange}
                            placeholder="Enter your address"
                            className="w-full p-2 border border-gray-300 rounded mt-4"
                        />
                        <button
                            onClick={handleSearch}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Search
                        </button>
                        <div className="mt-8">
                            <GoogleMap
                                mapContainerStyle={{ width: '100%', height: '400px' }}
                                center={location}
                                zoom={14}
                            >
                                {stores.map((store, index) => (
                                    <Marker
                                        key={index}
                                        position={{
                                            lat: store.geometry.location.lat,
                                            lng: store.geometry.location.lng
                                        }}
                                    />
                                ))}
                            </GoogleMap>
                        </div>
                    </div>
                </div>
            </div>
        </LoadScript>
    );
};

export default NearbyStore;
