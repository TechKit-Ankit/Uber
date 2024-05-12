import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import HomeScreen from './screens/HomeScreen';
import { GlobalStyles } from './screens/GlobalStyle';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './screens/MapScreen.js';


export default function App() {
    const Stack = createNativeStackNavigator();
    return (
        <Provider store={store}>
            <NavigationContainer>
                <SafeAreaProvider>
                    <KeyboardAvoidingView style={{ flex: 1 }}>
                        {/* it is for giving keyboard space but otherwise for me also it is working */}
                        <Stack.Navigator>
                            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
                                headerShown: false,
                            }} />
                            <Stack.Screen name="MapScreen" component={MapScreen} options={{
                                headerShown: false,
                            }} />
                        </Stack.Navigator>
                    </KeyboardAvoidingView>
                </SafeAreaProvider>
            </NavigationContainer>
        </Provider>
    );
}