import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice';
import { useDispatch, useSelector } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import config from '../config';

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    // console.log('Origin', origin);
    const dispatch = useDispatch();

    const mapRef = useRef(null);
    useEffect(() => {
        setTimeout(() => {
            mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            });
        }, 100);
    }, [origin, destination])

    useEffect(() => {
        if (!origin || !destination) return;
        const getTravelTime = async () => {
            fetch(
                `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.description}&destinations=${destination.description}&key=${config.GOOGLE_MAPS_API_KEY}`
            )
                .then((res) => res.json())
                .then((data) => {
                    dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
                    console.log(data);
                });
        };
        getTravelTime();
    }, [origin, destination, config.GOOGLE_MAPS_API_KEY]);
    return (
        <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            mapType="standard"
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}>
            {origin && destination && (
                <MapViewDirections
                    // lineDashPattern={[0]}
                    origin={origin?.description}
                    destination={destination?.description}
                    apikey={config.GOOGLE_MAPS_API_KEY}
                    strokeWidth={3}
                    strokeColor='black'
                />
            )}
            {origin?.location && (< Marker
                title='Origin'
                description={origin.description}
                identifier='origin'
                coordinate={{
                    latitude: origin.location.lat,
                    longitude: origin.location.lng,
                }}
            />)}
            {destination?.location && (< Marker
                title='Destination'
                description={destination.description}
                identifier='destination'
                coordinate={{
                    latitude: destination.location.lat,
                    longitude: destination.location.lng,
                }}
            />)}
        </MapView>
    )
}

export default Map