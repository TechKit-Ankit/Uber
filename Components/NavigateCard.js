import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import config from '../config';
import { setDestination, setOrigin } from '../slices/navSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';


const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    console.log(config.GOOGLE_MAPS_API_KEY);
    return (
        <SafeAreaView style={tw`android:pb-10 flex-1 bg-white dark:bg-black`}>
            <Text style={tw`text-center py-5 text-xl`}>Hi, buddy</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <GooglePlacesAutocomplete
                    placeholder="Where to?"
                    debounce={400}
                    styles={{
                        container: {
                            flex: 0,
                            backgroundColor: 'white',
                            paddingTop: 20,
                        },
                        textInput: {
                            backgroundColor: '#DDDDDF',
                            borderRadius: 20,
                            fontSize: 18,
                        },
                        textInputContainer: {
                            paddingHorizontal: 20,
                            paddingBottom: 0,
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
                        dispatch(setDestination({
                            location: details?.geometry?.location,
                            description: data.description,
                        }));
                        // dispatch(setDestination(null));
                    }
                    }
                />
                <View style={tw`flex-row justify-evenly bg-white py-2 border-t
                border-gray-100`}>
                    <TouchableOpacity
                        style={tw` flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
                        onPress={() => navigation.navigate('RideOptionsCard')}
                    >
                        <Icon
                            name="car" type="font-awesome" color="white" size={16} />
                        <Text style={tw`text-white text-center`}>Rides</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={tw` flex flex-row justify-between w-24 px-4 py-3 rounded-full`} >
                        <Icon
                            name="fast-food-outline"
                            type="ionicon"
                            color="black"
                            size={16}
                        />
                        <Text style={tw` text-center`}>Eats</Text>
                    </TouchableOpacity>
                </View>
            </View >
        </SafeAreaView >
    )
}

export default NavigateCard 