import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc'
import { Icon, Image } from 'react-native-elements';
import { selectTravelTimeInformation } from '../slices/navSlice';
import { useSelector } from 'react-redux';

const data = [
    {
        id: "Uber-X-123",
        title: "UberX",
        multiplier: 1,
        image: "https://links.papareact.com/3pn",
    },
    {
        id: "Uber-XL-456",
        title: "Uber XL",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8",
    },
    {
        id: "Uber-LUX-789",
        title: "Uber LUX",
        multiplier: 1.75,
        image: "https://links.papareact.com/7pf",
    },
];


const RideOptionsCard = () => {
    const BASE_FARE = 100; // Base fare in INR
    const PER_KM_RATE = 15; // Per kilometer rate in INR
    const SURGE_CHARGE_RATE = 1.2; // Surge charge rate (20% surge)
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null)
    const travelTimeInformation = useSelector(selectTravelTimeInformation)
    const distanceText = travelTimeInformation?.distance.text; // Assuming travelTimeInformation is your object
    const distanceValue = parseFloat(distanceText); // Assuming distanceText is a string
    // console.log(selected)
    console.log(travelTimeInformation)
    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("NavigateCard")}
                    style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}>
                    <Icon name="chevron-left" type="fontawesome" />
                </TouchableOpacity>
                <Text style={tw` text-center py-5 text-xl`}>Select a Ride-{travelTimeInformation?.distance.text}</Text>
            </View>
            <FlatList
                data={data}
                style={{
                    flex: 1,
                }}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={tw`flex-row items-center justify-between px-10
                ${item.id === 'Uber-X-123' && 'border-b'} ${item.id === selected?.id && 'bg-gray-200'} pb-5`}
                        onPress={() => setSelected(item)}
                    >
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: 'contain',
                            }}
                            source={{ uri: item.image }}
                        />
                        <View style={tw`-ml-6`}>
                            <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
                            <Text>{travelTimeInformation?.duration.text}</Text>
                        </View>
                        <Text style={tw`text-xl`}>
                            {distanceValue * PER_KM_RATE * item.multiplier + BASE_FARE * SURGE_CHARGE_RATE}
                        </Text>


                    </TouchableOpacity>
                )}
            />
            <View>
                <TouchableOpacity
                    disabled={!selected}
                    style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}>
                    <Text style={tw`text-center text-white text-xl`}>
                        Choose {selected?.title}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard