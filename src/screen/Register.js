import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth'


import logo from '../image/logo.png';

const Register = ({ navigation }) => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleRegister = () => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async (userCredential) => {
                // Lấy người dùng mới đã được tạo
                const user = userCredential.user;

                // Cập nhật tên người dùng
                await user.updateProfile({
                    displayName: fullname
                });

                Alert.alert('Tài khoản đã được tạo và đăng nhập thành công');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('Email đã tồn tại');
                } else if (error.code === 'auth/invalid-email') {
                    Alert.alert('Email không hợp lệ');
                } else {
                    Alert.alert('Đã xảy ra lỗi: ' + error.message);
                }

                console.error(error);
            });
    };



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <View style={styles.innerContainer}>
                    <Image style={styles.logo} source={logo} />
                    <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 30 }}>Create an Account</Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Name'
                            style={styles.input}
                            onChangeText={(text) => setFullname(text)}

                        />
                        <TextInput
                            placeholder='Email'
                            style={styles.input}
                            onChangeText={(text) => setEmail(text)}

                            keyboardType='email-address'
                        />

                        <TextInput
                            placeholder='Password'
                            style={styles.input}
                            onChangeText={(text) => setPassword(text)}

                            secureTextEntry
                        />

                    </View>

                    {errorMessage !== '' && (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    )}

                    <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.signInLink} onPress={() => navigation.navigate('Login')}>
                        <Text>Already have an account? </Text>
                        <Text style={styles.linkText} onPress={() => navigation.goBack()}>Login now</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    innerContainer: {
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: 350,
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        marginTop: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    registerButton: {
        backgroundColor: '#35C2C1',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signInLink: {
        flexDirection: 'row',
        marginTop: 60,
    },
    linkText: {
        color: '#35C2C1',
    },
});

export default Register

