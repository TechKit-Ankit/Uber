import React, { useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';



// Function to handle Google Sign-In
const signIn = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        await GoogleSignin.signOut()
        const userInfo = await GoogleSignin.signIn();
        console.log(userInfo);
        await auth().signInWithEmailAndPassword(userInfo.user.email, userInfo.user.id);
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            console.log('cancelled');
        } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
            console.log('in progress');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
            console.log('play services not available');
        } else {
            // some other error happened
            console.log('some other error');
        }
    }
};

const LoginScreen = () => {
    useEffect(() => {
        GoogleSignin.configure()
    }, []);
    const navigation = useNavigation();

    const loginValidationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password should be at least 6 characters').required('Password is required'),
    });

    const handleLogin = async (values) => {
        try {
            await auth().signInWithEmailAndPassword(values.email, values.password);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginValidationSchema}
            onSubmit={values => handleLogin(values)}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.container}>
                    <Text>Email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                    />
                    {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

                    <Text>Password</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry
                    />
                    {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

                    <Button onPress={handleSubmit} title="Login" />
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.link}>Don't have an account? Sign Up</Text>
                    </TouchableOpacity>
                    <Button title="Google Sign-In" onPress={signIn} />
                </View>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 16,
    },
    error: {
        color: 'red',
    },
    link: {
        color: 'blue',
        marginTop: 16,
        textAlign: 'center',
    },
});

export default LoginScreen;
