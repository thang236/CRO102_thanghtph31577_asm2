import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import auth from '@react-native-firebase/auth';

const ChangePasswordScreen = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleChangePassword = () => {
        const user = auth().currentUser;
        const credential = auth.EmailAuthProvider.credential(user.email, currentPassword);

        // Xác thực mật khẩu hiện tại trước khi thay đổi mật khẩu
        user.reauthenticateWithCredential(credential)
            .then(() => {
                // Xác thực thành công, tiến hành thay đổi mật khẩu
                if (newPassword === confirmNewPassword) {
                    return user.updatePassword(newPassword);
                } else {
                    throw new Error('Mật khẩu mới và xác nhận mật khẩu không khớp.');
                }
            })
            .then(() => {
                // Mật khẩu đã được thay đổi thành công
                Alert.alert('Thay đổi mật khẩu thành công');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
            })
            .catch(error => {
                // Xử lý lỗi
                Alert.alert('Lỗi', error.message);
            });
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={currentPassword}
                placeholder='Mật khẩu hiện tại'
                onChangeText={setCurrentPassword}
                secureTextEntry={true}
                style={styles.textinput}
            />
            <TextInput
                value={newPassword}
                placeholder='Mật khẩu mới'
                onChangeText={setNewPassword}
                secureTextEntry={true}
                style={styles.textinput}
            />
            <TextInput
                value={confirmNewPassword}
                placeholder='Xác nhận mật khẩu mới'
                onChangeText={setConfirmNewPassword}
                secureTextEntry={true}
                style={styles.textinput}
            />
            <Pressable onPress={handleChangePassword} style={styles.btn}>
                <Text style={styles.text}>Thay đổi mật khẩu</Text>
            </Pressable>
        </View>
    );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
    btn: {
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginTop: 30,
        borderRadius: 15,
    },
    textinput: {
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 20
    },
    text: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold'
    }
});
