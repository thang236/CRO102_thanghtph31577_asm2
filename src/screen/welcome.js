import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';




const Welcome = ({ navigation }) => {
    useFocusEffect(
        React.useCallback(() => {
            setTimeout(() => {
                navigation.navigate('Login')
            }, 3000);
            return () => {
            };
        }, [])
    );

    useEffect(() => {

    }, [])
    return (
        <View style={styles.contaier}>
            <Image style={{ width: 200, height: 200, borderRadius: 100 }} source={require('../image/avt.jpeg')} />
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>Họ tên: Hoàng Tiến Thăng</Text>
            <Text style={{ fontSize: 18, marginTop: 10 }}>Mã SV: PH31577</Text>
            <Text style={{ fontSize: 18, marginTop: 10 }}>Lớp học: MD18305</Text>
            <Ionicons name="heart" size={30} color="#900" />
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>Ứng dụng: Coffe Shop</Text>

        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    contaier: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
})