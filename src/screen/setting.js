import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
import { isDarkMode, MyTheme, useTheme, } from '../Themes/MyTheme'

import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth'





const SettingsScreen = ({ navigation }) => {
    const { theme, toggleTheme, isDarkMode } = useTheme();

    const [isEnabled, setIsEnabled] = useState(isDarkMode);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        return toggleTheme
    };


    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={styles.settingBlock}>
                <Text style={[styles.blockTitle, { color: theme.textColor }]}>Thông tin cá nhân</Text>
                <View style={styles.settingItem}>
                    <Text style={{ color: theme.textColor }}>Họ và tên: Hoàng Tiến Thăng</Text>
                    <Text style={{ color: theme.textColor }}>Mã sinh viên: PH31577</Text>
                    <Text style={{ color: theme.textColor }}>Lớp: MD18305</Text>
                </View>
            </View>
            <View style={styles.settingBlock}>
                <Text style={[styles.blockTitle, { color: theme.textColor, }]}>Thông tin điện thoại</Text>
                <View style={styles.settingItem}>
                    <Text style={{ color: theme.textColor }}>Loại điện thoại: Iphone</Text>
                    <Text style={{ color: theme.textColor }}>Cấu hình CPU: A13</Text>
                    <Text style={{ color: theme.textColor }}>RAM: 4GB</Text>
                    <Text style={{ color: theme.textColor }}>Bộ nhớ trong: 64GB</Text>
                </View>
            </View>
            <View style={styles.settingBlock}>
                <Text style={[styles.blockTitle, { color: theme.textColor }]}>Thiết lập riêng</Text>
                <View style={[styles.settingItem, { justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }]}>
                    <Text style={{ color: theme.textColor }}>Đổi theme</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleTheme}
                        value={isDarkMode}
                    />


                </View>
                <TouchableOpacity style={[styles.settingItem, { justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }]} onPress={() => navigation.navigate('changePass')}>
                    <Text style={{ color: theme.textColor }}>Đổi password</Text>
                    <Ionicons name="arrow-forward" size={24} color="#000" />

                </TouchableOpacity>
                <TouchableOpacity style={[styles.settingItem, { justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }]} onPress={() => {
                    auth().signOut()
                        .then(() => {
                            // Đăng xuất thành công
                            console.log('Logged out successfully!');
                            navigation.navigate('Welcome')
                        })
                        .catch((error) => {
                            // Xử lý lỗi đăng xuất
                            console.error('Error logging out:', error);
                        });
                }}>
                    <Text style={{ color: theme.textColor }}>Đăng xuất</Text>
                    <Ionicons name="arrow-forward" size={24} color="#000" />

                </TouchableOpacity>

            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#FFF'
    },
    settingBlock: {
        marginBottom: 20,
    },
    blockTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    settingItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
});

export default SettingsScreen;
