import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from 'react-native'; // Import ScrollView

import Ionicons from 'react-native-vector-icons/Ionicons';


import HotProducts from '../component/hotProducts';
import AdBanner from '../component/adBanner';
import RecentlyViewed from '../component/recentlyViewed';
import avatar1 from '../image/avt.jpeg';
import { MyTheme, useTheme } from '../Themes/MyTheme'
import NewProducts from '../component/newProduct';

import { addProductAPI, deleteProductApi, fetchProducts, updateProductApi } from '../redux/actions/productAction'
import { useDispatch, useSelector } from 'react-redux'
import { fetchComment, addCommentAPI } from '../redux/actions/commentAction'
import auth from '@react-native-firebase/auth'





const Home = ({ navigation }) => {

    const dispatch = useDispatch();

    const listProduct = useSelector(state => state.listProduct.listProduct)
    const [hotProducts, setHotProducts] = useState([]);

    const [nameUser, setNameUser] = useState('Thăng');
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        dispatch(fetchProducts());

        auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(11111, user.displayName);
                setNameUser(user.displayName);
            }
        });



    }, [dispatch])



    // Hàm xử lý khi người dùng xem một mặt hàng
    const handleViewItem = (item) => {
        // Thực hiện các hành động cần thiết, ví dụ: lưu mặt hàng đã xem vào cơ sở dữ liệu, thống kê, v.v.
        console.log('Viewed item:', item);
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
            <View style={[styles.innerContainer, { marginTop: 60, paddingBottom: 10 }]}>
                <View style={styles.flexRow}>
                    <View style={styles.item1}>
                        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                            <Image style={styles.avt} source={avatar1} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold', color: theme.textColor }}> Xin chào {nameUser} </Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("Cart")} style={styles.touchableOpacity}>
                        <Ionicons name="cart" size={30} color={theme.icon} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
                <View style={styles.innerContainer}>

                    <AdBanner />
                    <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 20, color: theme.textColor }}>Sản phẩm mới</Text>
                    <NewProducts newProducts={listProduct} navigation={navigation} />

                    <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 20, color: theme.textColor }}>Sản phẩm hot</Text>
                    <HotProducts hotProducts={listProduct} navigation={navigation} />


                    <Text style={{ fontSize: 25, fontWeight: 'bold', marginVertical: 20, color: theme.textColor }}>Mặt hàng đã xem gần đây</Text>
                    <RecentlyViewed navigation={navigation} onViewItem={handleViewItem} />

                </View>
            </ScrollView>
        </View>


    );
};



const styles = StyleSheet.create({
    container: {

        backgroundColor: '#fff',
    },
    innerContainer: {

        marginHorizontal: 20
    },
    avt: {
        width: 50,
        height: 50,
        borderRadius: 30,
        marginStart: 10,
    },
    item1: {
        width: '60%'
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default Home;
