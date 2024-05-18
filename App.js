import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import HomeScreen from './screens/HomeScreen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './screens/MapScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

export default function App() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <SafeAreaView style={{ flex: 1 }}>
                        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                            <Stack.Navigator>
                                {!user ? (
                                    <>
                                        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
                                        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                                    </>
                                ) : (
                                    <>
                                        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                                        <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />
                                    </>
                                )}
                            </Stack.Navigator>
                        </KeyboardAvoidingView>
                    </SafeAreaView>
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
