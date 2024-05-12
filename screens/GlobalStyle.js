import { StyleSheet, Platform } from "react-native";

// it is the safearea for android in normal react native styling
export const GlobalStyles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? 40 : 0,
    }
});