import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import Map from '../Components/Map'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RideOptionsCard from '../Components/RideOptionsCard'
import NavigateCard from '../Components/NavigateCard'

const MapScreen = () => {
    const Stack = createNativeStackNavigator()
    return (
        <View>
            <View style={tw`h-1/2`}>
                <Map />
            </View>
            <View style={tw`h-1/2`}>
                <Stack.Navigator>
                    <Stack.Screen name='NavigateCard'
                        component={NavigateCard}
                        options={{ headerShown: false }}>
                    </Stack.Screen>
                    <Stack.Screen name='RideOptionsCard'
                        component={RideOptionsCard}
                        options={{ headerShown: false }}>
                    </Stack.Screen>
                </Stack.Navigator>
            </View>
        </View>
    )
}

export default MapScreen