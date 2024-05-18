import React from 'react';
import { Text, View, SafeAreaView, Image } from 'react-native';
import tw from 'twrnc';
import NavOptions from '../Components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import config from '../config';
import auth from '@react-native-firebase/auth';
import { Button } from 'react-native';

const HomeScreen = () => {
    const dispatch = useDispatch();
    // console.log(GOOGLE_MAPS_API_KEY);
    const handleLogout = () => {
        auth().signOut();
        dispatch(setOrigin(null));
        dispatch(setDestination(null));
    };
    return (
        // Added the SafeAreaView for android to the HomeScreen component
        <SafeAreaView style={tw`android:pt-10 h-full bg-white dark:bg-black`}>
            <View style={{ marginTop: 20 }}>
                <Button title="Logout" onPress={handleLogout} />
            </View>
            <View style={tw`p-5 `}>
                <Image source={{
                    uri: 'https://links.papareact.com/gzs',
                }} style={{
                    width: 100, height: 100, resizeMode: 'contain'
                }} />
                <GooglePlacesAutocomplete
                    debounce={400}
                    placeholder='Where From?'
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInput: {
                            fontSize: 18,
                        },
                    }}
                    query={{
                        key: config.GOOGLE_MAPS_API_KEY,
                        language: 'en',
                    }}
                    fetchDetails={true}
                    returnKeyType={'search'}
                    enablePoweredByContainer={false}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    onPress={(data, details = null) => {
                        // console.log(data, details);
                        dispatch(setOrigin({
                            location: details?.geometry?.location,
                            description: data.description,
                        }));
                        dispatch(setDestination(null));
                        // why is this dispatching null?
                    }
                    }
                />
                <NavOptions />
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
