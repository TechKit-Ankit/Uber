import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';

const data = [
    {
        id: "123",
        title: "Get a ride",
        image: "https://links.papareact.com/3pn",
        screen: "MapScreen",
    },
    {
        id: "456",
        title: "Order food",
        image: "https://links.papareact.com/28w",
        screen: "EatsScreen", // Change in future...
    }
];
const NavOptions = () => {
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin)
    return (
        <FlatList data={data}
            horizontal
            keyExtractor={(item) =>
                // console.log(item.id) || console.log(item) ||
                item.id
            }
            renderItem={({ item }) => (
                // console.log('desrutured', props)
                <TouchableOpacity style={tw`p-2 pt-4 pl-6 pb-8 bg-gray-200 m-2 w-40`}
                    onPress={() => navigation.navigate(item.screen)}
                    disabled={!origin}
                >
                    <View style={tw`${!origin && 'opacity-40'}`}>
                        <Image source={{ uri: item.image }}
                            style={{ width: 120, height: 120, resizeMode: 'contain' }} />
                        <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                        <Icon
                            style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                            name="arrowright" I
                            color="white"
                            type="antdesign"

                        />
                    </View>
                </TouchableOpacity>
            )
            } />
    )
}

export default NavOptions